"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddArticle() {
  const CLOUD_NAME = "djossd4aw";
  const UPLOAD_PRESET = "news_app";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true); // Start loading animation

    try {
      const imageUrl = await uploadImage();

      const res = await fetch("/api/articles", {
        method: "POST",
        body: JSON.stringify({ title, content, imageUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create article!!");
      }

      toast.success("Article created successfully!!");
      setLoading(false); // Stop loading animation
      router.push("/");
      router.refresh();
    } catch (error) {
      setLoading(false); // Stop loading animation
      toast.error("Failed to create article!!");
      throw new Error("Failed to create article!!");
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
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
        <input
          onChange={(e) => setImage(e.target.files[0])}
          className="border border-slate-500 px-4 py-2"
          type="file"
          placeholder="Article Image"
          accept=".jpg,.jpeg,.png"
        />
        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          {loading && (
            <div className="absolute inset-0 bg-gray-700 opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          Add Article
        </button>
      </form>
    </div>
  );
}
