import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/support/ticket - List tickets for Directorate Admin
export async function GET() {
  try {
    const tickets = await prisma.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: tickets.length, data: tickets });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/support/ticket - Submit support ticket from floating speed dial hub
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const ticketNumber = `EWS-TICK-${Date.now().toString().slice(-6)}`;

    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNumber,
        name,
        email: email.trim().toLowerCase(),
        message,
        status: "OPEN",
      },
    });

    return NextResponse.json({
      success: true,
      message: `Support ticket #${ticketNumber} created successfully! Our senior desk will respond shortly.`,
      data: ticket,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create support ticket." },
      { status: 500 }
    );
  }
}
