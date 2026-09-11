import { NextRequest, NextResponse } from "next/server";
import { generateWeeklySustainabilityBlog } from "@/lib/blog-generator";
import { addDynamicBlog } from "@/lib/blog-store";

// GET /api/cron/generate-weekly-blog - Weekly automated cron trigger (Vercel Cron / Linux Crontab / GitHub Action)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    // Verify cron secret if set in production
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false, error: "Unauthorized cron execution" }, { status: 401 });
    }

    const newArticle = await generateWeeklySustainabilityBlog();
    addDynamicBlog(newArticle);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Weekly automated sustainability dispatch successfully compiled and published.",
      articleTitle: newArticle.title,
      slug: newArticle.slug,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Weekly cron generation failed" },
      { status: 500 }
    );
  }
}
