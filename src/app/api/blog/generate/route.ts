import { NextRequest, NextResponse } from "next/server";
import { generateWeeklySustainabilityBlog } from "@/lib/blog-generator";
import { addDynamicBlog } from "@/lib/blog-store";

// POST /api/blog/generate - Synthesize a fresh, unique regulatory article and publish live
export async function POST(request: NextRequest) {
  try {
    let category: string | undefined;
    try {
      const body = await request.json();
      category = body.category;
    } catch {
      // Body is optional
    }

    const newArticle = await generateWeeklySustainabilityBlog(category);

    // Push into published blogs list at the top
    addDynamicBlog(newArticle);

    return NextResponse.json({
      success: true,
      message: `Article "${newArticle.title}" successfully synthesized and published to /blog!`,
      data: newArticle,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate weekly blog" },
      { status: 500 }
    );
  }
}
