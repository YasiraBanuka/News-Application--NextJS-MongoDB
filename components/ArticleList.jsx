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
        <div
          // style={{ maxWidth: "500px" }}
          className="p-4 border border-slate-300 mx-8 mb-4 flex flex-col justify-between"
          key={article._id}
        >
          <div>
            <h2 className="font-bold text-2xl mb-4">{article.title}</h2>

            <div className="flex mb-2">
              <div className="font-bold mr-2">Content:</div>
              <div className="text-balance">{article.content}</div>
            </div>
            <div className="flex">
              <div className="font-bold mr-2">Posted Date: </div>
              <div>
                {format(new Date(article.createdAt), "MM/dd/yyyy hh:mm a")}
              </div>
            </div>
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt="Article Image"
                className="mt-4"
                style={{ maxWidth: "15%" }}
              />
            )}
          </div>

          <div className="flex justify-end items-end gap-2">
            <div className="flex gap-2">
              <RemoveBtn id={article._id} />
              <Link href={`/editArticle/${article._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
