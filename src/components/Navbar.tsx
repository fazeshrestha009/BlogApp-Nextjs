import Link from "next/link";
const Navbar: React.FC = () => {
    return (
        <nav className="w-full bg-blue-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <Link href="/" className="text-lg font-bold">My Blog</Link>
          <div>
            <Link href="/" className="mr-6">Home</Link>
            <Link href="/details" className="mr-6">Posts</Link>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  