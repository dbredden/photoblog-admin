import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col bg-green-600 border-r text-black min-h-screen">
      <div className="p-4 font-semibold text-xl">Admin</div>

      <nav className="flex-1 px-4">
        <Link
          to="/"
          className="block py-2 text-white hover:text-blue-600 transition-colors"
        >
          Upload
        </Link>
      </nav>
    </aside>
  );
}
