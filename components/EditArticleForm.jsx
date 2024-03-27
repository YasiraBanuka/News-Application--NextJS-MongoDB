"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditArticleForm({ id, title, content }) {
  const CLOUD_NAME = "djossd4aw";
  const UPLOAD_PRESET = "news_app";

  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading animation

    try {
      let imageUrl = ""; // Initialize imageUrl

      if (newImage) {
        // Check if a new image is selected
        imageUrl = await uploadImage(); // Upload the new image
      }

      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify({ newTitle, newContent, imageUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to update article!!");
      }

      setLoading(false); // Stop loading animation

      router.push("/");
      router.refresh();
    } catch (error) {
      setLoading(false); // Stop loading animation
      console.log(error);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();

    formData.append("file", newImage);
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
        <input
          onChange={(e) => setNewImage(e.target.files[0])}
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
          Update Topic
        </button>
      </form>
    </div>
  );
}
