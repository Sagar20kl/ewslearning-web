import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PROGRAMS } from "../src/data/programs";
import { INITIAL_BLOGS } from "../src/data/blogs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding EWS Learning Platform Database...");

  // 1. Hash Passwords
  const hashedPassword = await bcrypt.hash("admin2025", 10);

  // 2. Seed Master Users
  console.log("👤 Creating Core Users...");
  
  const adminUser = await prisma.user.upsert({
    where: { email: "director@ewslearning.com" },
    update: {},
    create: {
      name: "Dr. Rajeshwar Rao",
      email: "director@ewslearning.com",
      passwordHash: hashedPassword,
      role: "ADMIN",
      organization: "EWS Learning Directorate",
      department: "Academic & Regulatory Operations",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      phone: "+91 98100 22334",
      isVerified: true,
    },
  });

  const corporateUser = await prisma.user.upsert({
    where: { email: "vikram.m@ecoindustries.in" },
    update: {},
    create: {
      name: "Vikram Malhotra",
      email: "vikram.m@ecoindustries.in",
      passwordHash: hashedPassword,
      role: "CORPORATE_CLIENT",
      organization: "EcoIndustries Corp",
      department: "Director of EHS & Sustainability",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      phone: "+91 98200 44556",
      isVerified: true,
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: "ajay.k@ecoindustries.in" },
    update: {},
    create: {
      name: "Ajay Kushwaha",
      email: "ajay.k@ecoindustries.in",
      passwordHash: hashedPassword,
      role: "STUDENT",
      organization: "EcoIndustries Corp",
      department: "Plant Operations Lead",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      phone: "+91 97111 66778",
      isVerified: true,
    },
  });

  console.log(`✅ Seeded 3 Users: Admin (${adminUser.email}), Corporate (${corporateUser.email}), Student (${studentUser.email})`);

  // 3. Seed Programs, Modules, and Lessons
  console.log("📚 Seeding Curricula, Modules & Video Lessons...");
  for (const prog of PROGRAMS) {
    const createdProgram = await prisma.program.upsert({
      where: { slug: prog.slug },
      update: {
        title: prog.title,
        tagline: prog.tagline,
        description: prog.description,
        sector: prog.sector,
        mode: prog.mode,
        duration: prog.duration,
        level: prog.level,
        rating: prog.rating,
        reviewCount: prog.reviewCount,
        enrolledCount: prog.enrolledCount,
        priceINR: prog.priceINR,
        priceUSD: prog.priceUSD,
        coverImage: prog.coverImage,
        instructorName: prog.instructor.name,
        instructorRole: prog.instructor.role,
        highlights: JSON.stringify(prog.highlights),
        learningOutcomes: JSON.stringify(prog.learningOutcomes),
        targetAudience: JSON.stringify(prog.targetAudience),
        prerequisites: JSON.stringify(prog.prerequisites),
      },
      create: {
        slug: prog.slug,
        title: prog.title,
        tagline: prog.tagline,
        description: prog.description,
        sector: prog.sector,
        mode: prog.mode,
        duration: prog.duration,
        level: prog.level,
        rating: prog.rating,
        reviewCount: prog.reviewCount,
        enrolledCount: prog.enrolledCount,
        priceINR: prog.priceINR,
        priceUSD: prog.priceUSD,
        coverImage: prog.coverImage,
        instructorName: prog.instructor.name,
        instructorRole: prog.instructor.role,
        highlights: JSON.stringify(prog.highlights),
        learningOutcomes: JSON.stringify(prog.learningOutcomes),
        targetAudience: JSON.stringify(prog.targetAudience),
        prerequisites: JSON.stringify(prog.prerequisites),
      },
    });

    // Seed Modules & Lessons
    for (let mIdx = 0; mIdx < prog.curriculum.length; mIdx++) {
      const mod = prog.curriculum[mIdx];
      
      // Delete existing lessons/modules for clean sync
      const existingMod = await prisma.module.findFirst({
        where: { programId: createdProgram.id, title: mod.title }
      });

      let moduleId = existingMod?.id;
      if (!existingMod) {
        const newMod = await prisma.module.create({
          data: {
            title: mod.title,
            duration: mod.duration,
            order: mIdx + 1,
            programId: createdProgram.id,
          }
        });
        moduleId = newMod.id;
      }

      if (moduleId) {
        for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
          const l = mod.lessons[lIdx];
          const existingLesson = await prisma.lesson.findFirst({
            where: { moduleId, title: l.title }
          });

          if (!existingLesson) {
            await prisma.lesson.create({
              data: {
                title: l.title,
                duration: l.duration,
                videoUrl: l.videoUrl,
                isFreePreview: l.isFreePreview || false,
                summary: l.summary,
                order: lIdx + 1,
                moduleId,
              }
            });
          }
        }
      }
    }
  }

  console.log(`✅ Seeded ${PROGRAMS.length} Master Programs with all modules and video lessons`);

  // 4. Seed Initial Blog Posts
  console.log("📰 Seeding Initial Blog Posts...");
  for (const blog of INITIAL_BLOGS) {
    await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: {},
      create: {
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,
        readTime: blog.readTime,
        publishedAt: blog.publishedAt,
        isAutoGenerated: blog.isAutoGenerated || false,
        coverImage: blog.coverImage,
        authorName: blog.author.name,
        authorRole: blog.author.role,
        authorAvatar: blog.author.avatar,
        sourceCitations: JSON.stringify(blog.sourceCitations || []),
        content: blog.content,
      }
    });
  }

  console.log(`✅ Seeded ${INITIAL_BLOGS.length} Published Blog Posts`);

  // 5. Seed Corporate Members & SEBI BRSR Roster
  console.log("🏢 Seeding Corporate Team Roster...");
  const teamMembers = [
    { name: "Ajay Kushwaha", email: "ajay.k@ecoindustries.in", department: "Plant Operations", role: "Plant Operations Lead", coursesCompleted: 2, totalHours: 18.5, brsrStatus: "COMPLIANT" },
    { name: "Deepak Sharma", email: "deepak.s@ecoindustries.in", department: "EHS & Safety", role: "Senior EHS Officer", coursesCompleted: 3, totalHours: 24.0, brsrStatus: "COMPLIANT" },
    { name: "Priya Nair", email: "priya.n@ecoindustries.in", department: "Procurement", role: "Supply Chain Manager", coursesCompleted: 1, totalHours: 12.0, brsrStatus: "COMPLIANT" },
    { name: "Rohan Verma", email: "rohan.v@ecoindustries.in", department: "Plant Operations", role: "Effluent Treatment Supervisor", coursesCompleted: 2, totalHours: 16.0, brsrStatus: "COMPLIANT" },
    { name: "Ananya Iyer", email: "ananya.i@ecoindustries.in", department: "Corporate Sustainability", role: "ESG Reporting Analyst", coursesCompleted: 4, totalHours: 32.0, brsrStatus: "COMPLIANT" },
    { name: "Suresh Patil", email: "suresh.p@ecoindustries.in", department: "Facilities", role: "Zero-Waste Campus Lead", coursesCompleted: 1, totalHours: 8.5, brsrStatus: "IN_PROGRESS" }
  ];

  for (const m of teamMembers) {
    await prisma.corporateMember.upsert({
      where: { email: m.email },
      update: {},
      create: {
        name: m.name,
        email: m.email,
        department: m.department,
        role: m.role,
        coursesCompleted: m.coursesCompleted,
        totalHours: m.totalHours,
        brsrStatus: m.brsrStatus,
        organization: "EcoIndustries Corp",
      }
    });
  }

  console.log(`✅ Seeded ${teamMembers.length} Corporate Team Members for SEBI BRSR`);

  // 6. Seed Inquiries & Lead Management
  console.log("📩 Seeding Sample Corporate Inquiries...");
  const sampleInquiries = [
    {
      name: "Vikram Malhotra",
      email: "vikram@techcampuses.com",
      phone: "+91 98200 12345",
      organization: "TechCampuses SEZ Ltd",
      programInterest: "Waste Management & Recycling Certification",
      teamSize: "200 - 500 Employees",
      mode: "Hybrid",
      message: "Need immediate waste stream characterization and BRSR audit training for our Gurugram facility.",
      status: "NEW",
    },
    {
      name: "Sanjana Rao",
      email: "sanjana.rao@globalfmcg.in",
      phone: "+91 97111 88990",
      organization: "Global FMCG Brands",
      programInterest: "Circular Economy & Extended Producer Responsibility",
      teamSize: "50 - 200 Employees",
      mode: "Online",
      message: "Looking to train our packaging sourcing engineers on CPCB plastic credit models.",
      status: "PROPOSAL_SENT",
    }
  ];

  for (const inq of sampleInquiries) {
    const existing = await prisma.inquiry.findFirst({ where: { email: inq.email } });
    if (!existing) {
      await prisma.inquiry.create({ data: inq });
    }
  }

  // 7. Seed Sample Enrollment & Verified Certificate
  const wasteProg = await prisma.program.findUnique({ where: { slug: "waste-management-recycling" } });
  if (wasteProg && studentUser) {
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userId_programId: {
          userId: studentUser.id,
          programId: wasteProg.id
        }
      },
      update: {},
      create: {
        userId: studentUser.id,
        programId: wasteProg.id,
        progress: 100,
        status: "COMPLETED",
      }
    });

    await prisma.certificate.upsert({
      where: { enrollmentId: enrollment.id },
      update: {},
      create: {
        certificateId: "EWS-2025-WMR-8841",
        studentName: studentUser.name,
        courseTitle: wasteProg.title,
        distinction: "Verified Masterclass Distinction (96% Pass Score)",
        verifyUrl: "/verify/EWS-2025-WMR-8841",
        enrollmentId: enrollment.id,
      }
    });

    console.log("✅ Seeded Sample Completed Enrollment & Verified Certificate EWS-2025-WMR-8841");
  }

  console.log("🎉 Database Seeding Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
