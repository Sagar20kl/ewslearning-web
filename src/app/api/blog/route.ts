import { NextRequest, NextResponse } from "next/server";
import { BlogPost } from "@/data/blogs";
import { getDynamicBlogs, addDynamicBlog } from "@/lib/blog-store";

// GET /api/blog - List all published blog articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let results = getDynamicBlogs();
    if (category && category !== "All") {
      results = results.filter((b) => b.category === category);
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/blog - Manually publish a blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, authorName } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required." },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      title,
      excerpt: excerpt || title,
      category: category || "Global Policy",
      readTime: "5 min read",
      publishedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      author: {
        name: authorName || "EWS Learning Editorial Desk",
        role: "Sustainability Contributor",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      content,
    };

    addDynamicBlog(newBlog);

    return NextResponse.json(
      {
        success: true,
        message: "Blog post successfully published.",
        data: newBlog,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to publish blog" },
      { status: 500 }
    );
  }
}
