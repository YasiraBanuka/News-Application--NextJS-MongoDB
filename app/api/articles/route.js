import connectMongoDB from "@/libs/mongodb";
import Article from "@/models/article";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, content, imageUrl } = await request.json();
  await connectMongoDB();
  await Article.create({ title, content, imageUrl });
  return NextResponse.json(
    { message: "Article created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const articles = await Article.find();
  return NextResponse.json({ articles });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Article.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Article deleted successfully" },
    { status: 200 }
  );
}
