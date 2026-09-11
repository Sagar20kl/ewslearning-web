import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/certificates/:id - Verify authenticity of a digital certificate
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const certId = params.id;

    if (!certId) {
      return NextResponse.json(
        { success: false, error: "Certificate ID is required." },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL) {
      // Mock validation for demo credentials
      return NextResponse.json({
        success: true,
        verified: true,
        certificateId: certId,
        studentName: "Verified Corporate Participant",
        status: "ACTIVE_AND_AUTHENTIC",
        issuer: "EWS Learning Academic Council",
        accreditation: "CPCB & BRSR Core Framework Aligned",
        issuedAt: "August 2025"
      });
    }

    const certificate = await prisma.certificate.findUnique({
      where: { certificateId: certId },
      include: {
        enrollment: {
          include: {
            user: { select: { name: true, organization: true } },
            program: { select: { title: true, sector: true, duration: true } }
          }
        }
      }
    });

    if (!certificate) {
      return NextResponse.json(
        { success: false, verified: false, error: "Certificate not found or invalid ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      certificate,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify certificate" },
      { status: 500 }
    );
  }
}
