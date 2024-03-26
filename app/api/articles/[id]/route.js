import connectMongoDB from "@/libs/mongodb";
import Article from "@/models/article";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newContent: content } = await request.json();
  await connectMongoDB();
  await Article.findByIdAndUpdate(id, { title, content });
  return NextResponse.json(
    { message: "Article updated successfully" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const article = await Article.findOne({ _id: id });
  return NextResponse.json({ article }, { status: 200 });
}
