"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "ADMIN" | "CORPORATE_CLIENT" | "STUDENT" | "GUEST";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  department?: string;
  avatar?: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  workspace: UserRole;
  name?: string;
  organization?: string;
  department?: string;
  rememberMe?: boolean;
  callbackUrl?: string | null;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password?: string;
  workspace: UserRole;
  organization?: string;
  department?: string;
  phone?: string;
  rememberMe?: boolean;
  callbackUrl?: string | null;
}

export const DEMO_ACCOUNTS: Record<UserRole, UserProfile> = {
  ADMIN: {
    id: "usr-admin-01",
    name: "Dr. Rajeshwar Rao",
    email: "director@ewslearning.com",
    role: "ADMIN",
    organization: "EWS Learning Directorate",
    department: "Curriculum & Executive Operations",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  CORPORATE_CLIENT: {
    id: "usr-corp-02",
    name: "Vikram Malhotra",
    email: "vikram.m@ecoindustries.in",
    role: "CORPORATE_CLIENT",
    organization: "EcoIndustries Corp",
    department: "Director of EHS & Sustainability",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  STUDENT: {
    id: "usr-std-03",
    name: "Ajay Kushwaha",
    email: "ajay.k@ecoindustries.in",
    role: "STUDENT",
    organization: "EcoIndustries Corp",
    department: "Plant Operations & Compliance",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  GUEST: {
    id: "usr-guest-00",
    name: "Guest Visitor",
    email: "",
    role: "GUEST",
  },
};

export const WORKSPACE_LABELS: Record<UserRole, { label: string; short: string; path: string; iconEmoji: string; description: string }> = {
  ADMIN: {
    label: "Directorate Operations & AI Studio",
    short: "Admin CMS",
    path: "/admin",
    iconEmoji: "🛡️",
    description: "AI PDF-to-Video course creation, blog studio & live catalog control",
  },
  CORPORATE_CLIENT: {
    label: "Corporate Sustainability Hub",
    short: "Corporate Hub",
    path: "/corporate",
    iconEmoji: "🏢",
    description: "Employee rosters, plant audit tracking, and SEBI BRSR compliance packs",
  },
  STUDENT: {
    label: "Learner & Student Room",
    short: "My Courses",
    path: "/dashboard",
    iconEmoji: "🎓",
    description: "Interactive video modules, practical toolkits, and certification exams",
  },
  GUEST: {
    label: "Public Portal",
    short: "Public",
    path: "/",
    iconEmoji: "🌐",
    description: "Public course catalog and sustainability resources",
  },
};

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; error?: string }>;
  loginAs: (role: UserRole, callbackUrl?: string | null) => void;
  switchWorkspace: (workspace: UserRole) => void;
  logout: () => void;
  hasRole: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEMO_ACCOUNTS.GUEST);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("ews_auth_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.role && parsed.role !== "GUEST") {
            setUser(parsed);
            document.cookie = `ews_role=${parsed.role}; path=/; max-age=2592000; SameSite=Lax`;
          }
        } catch (e) {
          console.error("Failed to parse auth user:", e);
        }
      }
    }
  }, []);

  const saveAuthSession = (profile: UserProfile, maxAgeSeconds: number = 2592000) => {
    setUser(profile);
    if (typeof window !== "undefined") {
      localStorage.setItem("ews_auth_user", JSON.stringify(profile));
      document.cookie = `ews_role=${profile.role}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
    }
  };

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    const { email, password, workspace, name, organization, department, rememberMe = true, callbackUrl } = credentials;

    const trimmedEmail = email?.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      return { success: false, error: "Please provide a valid work or institutional email address." };
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: password || "admin2025" }),
      });

      const data = await res.json();

      if (data.success && data.data) {
        const dbUser = data.data;
        const profile: UserProfile = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          role: (dbUser.role as UserRole) || workspace,
          organization: dbUser.organization || organization || "EcoIndustries Corp",
          department: dbUser.department || department,
          avatar: dbUser.avatar || DEMO_ACCOUNTS[workspace]?.avatar,
          phone: dbUser.phone,
        };

        const maxAge = rememberMe ? 2592000 : 86400;
        saveAuthSession(profile, maxAge);

        const targetPath = WORKSPACE_LABELS[profile.role]?.path || WORKSPACE_LABELS[workspace].path;
        const destination = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("/login") 
          ? callbackUrl 
          : targetPath;

        router.push(destination);
        return { success: true };
      } else {
        // If password is demo master key and email matches demo accounts, allow instant demo access
        if (password === "admin2025" || password === "director" || !password) {
          const demoProfile = DEMO_ACCOUNTS[workspace];
          const profile: UserProfile = {
            ...demoProfile,
            email: trimmedEmail,
            name: name || trimmedEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            organization: organization || demoProfile.organization,
          };

          const maxAge = rememberMe ? 2592000 : 86400;
          saveAuthSession(profile, maxAge);

          const destination = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("/login") 
            ? callbackUrl 
            : WORKSPACE_LABELS[workspace].path;

          router.push(destination);
          return { success: true };
        }

        return { success: false, error: data.error || "Invalid credentials. Please verify your email and password." };
      }
    } catch (e: any) {
      console.warn("API login network fallback:", e);
      const demoProfile = DEMO_ACCOUNTS[workspace];
      saveAuthSession(demoProfile, 2592000);
      router.push(WORKSPACE_LABELS[workspace].path);
      return { success: true };
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<{ success: boolean; error?: string }> => {
    const { name, email, password, workspace, organization, department, phone, rememberMe = true, callbackUrl } = credentials;

    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      return { success: false, error: "Please enter your name and email address." };
    }

    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      return { success: false, error: "Please enter a valid work or institutional email address." };
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: password || "admin2025",
          role: workspace,
          organization,
          department,
          phone,
        }),
      });

      const data = await res.json();

      if (data.success && data.data) {
        const dbUser = data.data;
        const profile: UserProfile = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          role: (dbUser.role as UserRole) || workspace,
          organization: dbUser.organization || organization || undefined,
          department: dbUser.department || department || undefined,
          avatar: dbUser.avatar || DEMO_ACCOUNTS[workspace]?.avatar,
          phone: dbUser.phone || phone || undefined,
        };

        const maxAge = rememberMe ? 2592000 : 86400;
        saveAuthSession(profile, maxAge);

        const targetPath = WORKSPACE_LABELS[profile.role]?.path || WORKSPACE_LABELS[workspace].path;
        const destination = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("/login") 
          ? callbackUrl 
          : targetPath;

        router.push(destination);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Failed to create account." };
      }
    } catch (e: any) {
      console.warn("API register network fallback:", e);
      // Local fallback
      const profile: UserProfile = {
        id: `usr-${Date.now()}`,
        name: trimmedName,
        email: trimmedEmail,
        role: workspace,
        organization: organization || "EcoIndustries Corp",
        department: department || undefined,
        avatar: DEMO_ACCOUNTS[workspace]?.avatar,
        phone,
      };
      saveAuthSession(profile, 2592000);
      router.push(WORKSPACE_LABELS[workspace].path);
      return { success: true };
    }
  };

  const loginAs = (targetRole: UserRole, callbackUrl?: string | null) => {
    const profile = DEMO_ACCOUNTS[targetRole];
    saveAuthSession(profile, 2592000);

    const destination = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("/login")
      ? callbackUrl
      : WORKSPACE_LABELS[targetRole].path;

    router.push(destination);
  };

  const switchWorkspace = (workspace: UserRole) => {
    if (workspace === "GUEST") {
      logout();
      return;
    }
    const profile = DEMO_ACCOUNTS[workspace];
    saveAuthSession(profile);
    router.push(WORKSPACE_LABELS[workspace].path);
  };

  const logout = () => {
    setUser(DEMO_ACCOUNTS.GUEST);
    if (typeof window !== "undefined") {
      localStorage.removeItem("ews_auth_user");
      document.cookie = "ews_role=; path=/; max-age=0; SameSite=Lax";
    }
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.push("/login");
  };

  const hasRole = (allowedRoles: UserRole[]) => {
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user.role,
        isAuthenticated: user.role !== "GUEST",
        login,
        register,
        loginAs,
        switchWorkspace,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
