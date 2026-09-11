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

    // Basic validation
    if (!email || !email.includes("@")) {
      return { success: false, error: "Please provide a valid work or institutional email address." };
    }

    if (workspace === "ADMIN") {
      // Require admin password verification
      if (password !== "admin2025" && password !== "director" && (password?.length ?? 0) < 4) {
        return { success: false, error: "Invalid directorate passcode. (Demo pass: admin2025)" };
      }
    }

    // Determine user profile
    const demoProfile = DEMO_ACCOUNTS[workspace];
    let profile: UserProfile;

    if (email.toLowerCase() === demoProfile.email.toLowerCase()) {
      profile = { ...demoProfile };
    } else {
      // Custom user credentials
      const formattedName = name || email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      profile = {
        id: `usr-${workspace.toLowerCase().substring(0, 3)}-${Date.now().toString(36)}`,
        name: formattedName,
        email: email.trim(),
        role: workspace,
        organization: organization || (workspace === "CORPORATE_CLIENT" ? "Enterprise Client" : workspace === "ADMIN" ? "EWS Directorate" : "Individual Learner"),
        department: department || (workspace === "CORPORATE_CLIENT" ? "Sustainability & EHS" : workspace === "ADMIN" ? "Executive Operations" : "Plant Workforce"),
        avatar: demoProfile.avatar,
      };
    }

    const maxAge = rememberMe ? 2592000 : 86400; // 30 days vs 1 day
    saveAuthSession(profile, maxAge);

    // Redirect to callbackUrl if valid, otherwise workspace default path
    const destination = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("/login") 
      ? callbackUrl 
      : WORKSPACE_LABELS[workspace].path;

    router.push(destination);
    return { success: true };
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
    const demoProfile = DEMO_ACCOUNTS[workspace];
    const updatedProfile: UserProfile = {
      ...user,
      id: demoProfile.id,
      name: user.name !== "Guest Visitor" ? user.name : demoProfile.name,
      role: workspace,
      organization: user.organization || demoProfile.organization,
      department: user.department || demoProfile.department,
      avatar: demoProfile.avatar,
    };
    saveAuthSession(updatedProfile, 2592000);
    router.push(WORKSPACE_LABELS[workspace].path);
  };

  const logout = () => {
    setUser(DEMO_ACCOUNTS.GUEST);
    if (typeof window !== "undefined") {
      localStorage.removeItem("ews_auth_user");
      document.cookie = "ews_role=; path=/; max-age=0; SameSite=Lax";
    }
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
