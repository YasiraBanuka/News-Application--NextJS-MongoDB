import connectMongoDB from "@/libs/mongodb";
import Article from "@/models/article";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newContent: content,
    imageUrl,
  } = await request.json(); // Extract imageUrl from request body
  await connectMongoDB();
  await Article.findByIdAndUpdate(id, { title, content, imageUrl }); // Include imageUrl in the update query
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
