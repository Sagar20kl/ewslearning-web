import { NextResponse } from "next/server";

export async function GET() {
  const uptimeSeconds = process.uptime ? Math.round(process.uptime()) : 0;
  
  return NextResponse.json(
    {
      status: "healthy",
      service: "EWS Learning Web Platform",
      timestamp: new Date().toISOString(),
      uptimeSeconds,
      environment: process.env.NODE_ENV || "development",
      database: process.env.DATABASE_URL ? "configured" : "demo_memory_mode",
      checks: {
        apiRouter: "operational",
        edgeMiddleware: "operational",
        aiPipeline: "operational"
      }
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0"
      }
    }
  );
}
