import { HiHome } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import person from "../public/person.png";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-300 px-8 py-5">
      <div className="flex items-center space-x-4">
        <Link className="text-gray-600 mr-4" href="/">
          <HiHome size={26} />
        </Link>
        <Link className="text-gray-600 text-2xl font-bold" href="/">
          News Application Dashboard
        </Link>
      </div>
      <div className="flex gap-6">
        <div className="bg-gray-200 p-2 border-r-2 rounded">
          <Link href="/addArticle">Add Article</Link>
        </div>
        <Image
          src={person}
          width={45}
          height={45}
          className="rounded-full"
          alt="person"
        />
      </div>
    </nav>
  );
}
