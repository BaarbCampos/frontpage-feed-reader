"use client";

import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import ArticleReader from "../article/ArticleReader";

type Article = {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  isBookmarked?: boolean;
};

type DashboardGridProps = {
  viewMode: "all" | "bookmarks";
};

const initialArticles: Article[] = [
  {
    id: "1",
    title: "AI is changing frontend development",
    description: "How modern tools are speeding up UI development and changing workflows.",
    source: "Tech Daily",
    date: "Today",
    isBookmarked: false,
  },
  {
    id: "2",
    title: "React 19 new features",
    description: "A look at the upcoming improvements in React ecosystem.",
    source: "Dev News",
    date: "Yesterday",
    isBookmarked: false,
  },
  {
    id: "3",
    title: "Design systems that scale",
    description: "Why companies like Notion and Stripe invest heavily in design systems.",
    source: "UX Collective",
    date: "2 days ago",
    isBookmarked: true,
  },
];

export default function DashboardGrid({ viewMode }: DashboardGridProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Nova trava para garantir que o componente saiba quando a leitura do navegador terminou
  const [isLoaded, setIsLoaded] = useState(false);

  // Sincroniza e busca do localStorage IMEDIATAMENTE após entrar na página
  useEffect(() => {
    const saved = localStorage.getItem("frontpage_articles");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setArticles(parsed);
        }
      } catch (e) {
        console.error("Erro ao ler favoritos:", e);
      }
    } else {
      // Se for a primeiríssima vez abrindo o app, salva a lista base com o item 3 ativo
      localStorage.setItem("frontpage_articles", JSON.stringify(initialArticles));
    }
    setIsLoaded(true); // Libera a renderização correta
  }, [viewMode]);

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Atualiza o estado local e grava no localStorage sincronizados por referência estável
    const updated = articles.map((art) =>
      art.id === id ? { ...art, isBookmarked: !art.isBookmarked } : art
    );
    
    setArticles(updated);
    localStorage.setItem("frontpage_articles", JSON.stringify(updated));
  };

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.source.toLowerCase().includes(searchQuery.toLowerCase());

    if (viewMode === "bookmarks") {
      return matchesSearch && art.isBookmarked === true;
    }
    return matchesSearch;
  });

  // Enquanto o Next.js não ler os dados reais do navegador, exibe um esqueleto ou tela preta limpa
  // Isso impede que o array padrão limpo sobrescreva o filtro de favoritos
  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 text-center text-zinc-500">
        Loading feed...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header & Busca */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">
            {viewMode === "bookmarks" ? "Saved Bookmarks" : "Your Feed"}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {viewMode === "bookmarks" 
              ? "All your saved articles in one place." 
              : "All the latest articles from your subscriptions."}
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition"
          />
        </div>
      </div>

      {/* Grid de Artigos */}
      <div className="space-y-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <ArticleCard
                id={article.id}
                title={article.title}
                description={article.description}
                source={article.source}
                date={article.date}
                isBookmarked={article.isBookmarked}
                onToggleBookmark={handleToggleBookmark}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-sm text-zinc-500">
              {viewMode === "bookmarks" 
                ? "You haven't bookmarked any articles yet." 
                : "No articles found matching your search."}
            </p>
          </div>
        )}
      </div>

      <ArticleReader 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </div>
  );
}