"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditArticleForm({ id, title, content }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify({ newTitle, newContent }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to update article!!");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-bold mx-8 mb-4">Update an Article</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-8">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="border border-slate-500 px-4 py-2"
          type="text"
          placeholder="Topic Title"
        />

        <textarea
          onChange={(e) => setNewContent(e.target.value)}
          value={newContent}
          className="border border-slate-500 px-4 py-2"
          type="text"
          placeholder="Topic Description"
          rows={6}
        />

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Update Topic
        </button>
      </form>
    </div>
  );
}
