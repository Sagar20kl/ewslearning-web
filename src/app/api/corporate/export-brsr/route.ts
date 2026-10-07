import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/corporate/export-brsr - Generate live SEBI BRSR Principle 6 CSV Audit Manifest
export async function GET() {
  try {
    const members = await prisma.corporateMember.findMany({
      orderBy: { department: "asc" },
    });

    const headers = [
      "Employee Name",
      "Corporate Email",
      "Department",
      "Role Designation",
      "Organization",
      "Curricula Completed",
      "Total Training Hours",
      "SEBI BRSR Compliance Status",
      "Enrollment Date",
      "Statutory Verification Standard",
    ];

    const rows = members.map((m) => [
      `"${m.name}"`,
      `"${m.email}"`,
      `"${m.department}"`,
      `"${m.role}"`,
      `"${m.organization}"`,
      m.coursesCompleted,
      m.totalHours,
      `"${m.brsrStatus}"`,
      `"${new Date(m.joinedAt).toISOString().split("T")[0]}"`,
      `"SEBI Circular SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122 Principle 6"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="EWS_SEBI_BRSR_Audit_Manifest_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate SEBI BRSR CSV." },
      { status: 500 }
    );
  }
}
