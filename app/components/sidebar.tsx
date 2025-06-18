import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white h-screen">
      <div className="p-6 text-2xl font-bold">Admin</div>
      <nav className="flex-1 px-4 space-y-2">
        <Link to="/" className="block py-2 hover:text-blue-400">Upload</Link>
      </nav>
      <div className="p-4 mt-auto">
        <button className="text-red-400 hover:text-red-600">
          Logout
        </button>
      </div>
    </aside>
  );
}
