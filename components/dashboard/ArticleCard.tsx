"use client";

import React from "react";

type Article = {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  isBookmarked?: boolean;
};

type ArticleCardProps = Article & {
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
};

export default function ArticleCard({
  id,
  title,
  description,
  source,
  date,
  isBookmarked = false,
  onToggleBookmark,
}: ArticleCardProps) {
  return (
    <div className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700">
      
      {/* Header do Card */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {source}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">{date}</span>
          
          {/* BOTÃO DE FAVORITO FORÇADO A FICAR VISÍVEL */}
          <button
            onClick={(e) => onToggleBookmark(id, e)}
            className={`p-1 rounded-lg border transition-all z-20 relative ${
              isBookmarked 
                ? "text-blue-500 bg-blue-500/10 border-blue-500/30" 
                : "text-zinc-400 bg-zinc-800/50 border-zinc-700/50 hover:text-zinc-200 hover:bg-zinc-800"
            }`}
            title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isBookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-zinc-100 leading-snug">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}