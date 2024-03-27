import EditArticleForm from "@/components/EditArticleForm";

const getArticleById = async (id) => {
  const apiUrl = process.env.API_URL;

  try {
    const res = await fetch(`${apiUrl}/api/articles/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch article");

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditArticle({ params }) {
  const { id } = params;
  const { article } = await getArticleById(id);
  const { title, content, imageUrl } = article;

  return (
    <EditArticleForm
      id={id}
      title={title}
      content={content}
      imageUrl={imageUrl}
    />
  );
}
