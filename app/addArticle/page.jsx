"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("title and content are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create article!!");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      throw new Error("Failed to create article!!");
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-bold mx-8 mb-4">Add New Article</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-8">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-slate-500 px-4 py-2"
          type="text"
          placeholder="Article Title"
        />

        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="border border-slate-500 px-4 py-2"
          type="text"
          placeholder="Article Content"
          rows={6}
        />

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Add Article
        </button>
      </form>
    </div>
  );
}
