import Link from "next/link";
import { Home, Newspaper, Bookmark, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="relative h-screen w-64 border-r border-white/10 bg-[#0B0D12] p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Frontpage</h1>
        <p className="text-xs text-slate-400">
          Your personal feed reader
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white transition"
        >
          <Home size={18} />
          Dashboard
        </Link>

        <Link
          href="/digest"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white transition"
        >
          <Newspaper size={18} />
          Digest
        </Link>

        <Link
          href="/bookmarks"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white transition"
        >
          <Bookmark size={18} />
          Bookmarks
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white transition"
        >
          <Settings size={18} />
          Settings
        </Link>
      </nav>

      {/* Footer */}
      <div className="text-xs text-slate-500 mt-auto pt-6">
        v1.0 • RSS Reader
      </div>
    </aside>
  );
}