import { INITIAL_BLOGS, BlogPost } from "@/data/blogs";

// In-memory runtime cache for dynamically generated and published blogs
export let dynamicBlogs: BlogPost[] = [...INITIAL_BLOGS];

export function getDynamicBlogs(): BlogPost[] {
  return dynamicBlogs;
}

export function addDynamicBlog(blog: BlogPost) {
  dynamicBlogs = [blog, ...dynamicBlogs];
}
