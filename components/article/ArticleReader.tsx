"use client";

import React, { useEffect } from "react";

type Article = {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
};

type ArticleReaderProps = {
  article: Article | null;
  onClose: () => void;
};

export default function ArticleReader({ article, onClose }: ArticleReaderProps) {
  // Fecha a gaveta ao apertar a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fundo escurecido (Backdrop) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Painel Lateral (Drawer) */}
      <div className="relative w-full max-w-xl h-full bg-zinc-950 border-l border-zinc-800 p-8 shadow-2xl overflow-y-auto flex flex-col">
        
        {/* Barra de Ações Superior */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-xs font-semibold text-blue-400 uppercase tracking-wider border border-zinc-800">
              {article.source}
            </span>
            <span className="text-xs text-zinc-500">{article.date}</span>
          </div>
          
          {/* Botão de Fechar */}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition focus:outline-none"
            aria-label="Close reader"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo do Artigo */}
        <article className="flex-1 max-w-none">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-100 leading-tight mb-4">
            {article.title}
          </h1>

          <div className="text-zinc-300 space-y-4 text-base leading-relaxed mt-6">
            <p className="font-medium text-lg text-zinc-400 italic">
              {article.description}
            </p>
            
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Mollis pretium lorem primis senectus habitasse lectus scelerisque donec. Cubilia platea varius tristique gravida nisl diam proin cras.
            </p>
          </div>
        </article>

        {/* Botão para abrir o site original */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl font-medium text-sm text-zinc-200 transition"
          >
            Read original source
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}