import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { format } from "date-fns";

const getArticles = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/articles", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch articles");

    return res.json();
  } catch (error) {
    console.log("Error loading articles: ", error);
  }
};

export default async function ArticleList() {
  const { articles } = await getArticles();

  return (
    <>
      {articles.map((article) => (
        <div className="p-4 border border-slate-300 mx-8 mb-4 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-bold text-2xl">{article.title}</h2>
            <div>Content: {article.content}</div>
            <div>
              Created at:{" "}
              {format(new Date(article.createdAt), "MM/dd/yyyy hh:mm a")}
            </div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={article._id} />
            <Link href={`/editArticle/${article._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
