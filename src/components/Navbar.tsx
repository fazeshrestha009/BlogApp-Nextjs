import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-blue-400 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div className="text-lg font-bold">
          <Link href="/">
            <Image src="/blog.png" alt="Company Logo" width={80} height={10} />
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/" className="mr-6 mt-4">
            Home
          </Link>
          <Link href="/posts/blogs" className="mr-6 mt-4">
            Posts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
