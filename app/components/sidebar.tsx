import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col h-screen transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      } bg-gray-900 text-white`}
    >
      <div className="p-6 text-2xl font-bold whitespace-nowrap overflow-hidden">
        {!collapsed ? "Admin" : "A"}
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 py-2 hover:text-blue-400"
        >
          <span className="material-icons">upload</span>
          {!collapsed && <span>Upload</span>}
        </Link>
      </nav>

      <div className="mt-auto flex flex-col items-center p-4 gap-4">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <button className="text-red-400 hover:text-red-600 text-sm">
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
