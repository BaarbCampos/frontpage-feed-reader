"use client";

import React, { useState } from "react";
import ArticleReader from "@/components/article/ArticleReader";

type DigestArticle = {
  id: string;
  title: string;
  source: string;
  description: string; // Adicionado para alimentar o Reader
  date: string;        // Adicionado para alimentar o Reader
};

type DigestSection = {
  category: string;
  timeToRead: string;
  articles: DigestArticle[];
};

const digestSections: DigestSection[] = [
  {
    category: "Technology & AI",
    timeToRead: "5 min read",
    articles: [
      { 
        id: "d1", 
        title: "The shift toward local LLMs in mobile applications", 
        source: "TechCrunch",
        description: "As mobile hardware grows more capable, developers are shifting smaller large language models directly onto consumer devices to protect user privacy and cut server bills down dramatically.",
        date: "Today"
      },
      { 
        id: "d2", 
        title: "Why vector databases are becoming the new infrastructure standard", 
        source: "InfoQ",
        description: "An in-depth analysis of how vector embeddings are reshaping software architecture, turning specialized databases like Pinecone and Milvus into essential stack components.",
        date: "Today"
      },
      { 
        id: "d3", 
        title: "Next.js 15 compilation times dropped by 35% with new compiler", 
        source: "Dev To",
        description: "The Vercel core team discusses the architectural updates made to their build pipeline that dramatically speed up local development server feedback loops.",
        date: "Yesterday"
      }
    ]
  },
  {
    category: "Design & User Experience",
    timeToRead: "3 min read",
    articles: [
      { 
        id: "d4", 
        title: "Bento grid layouts: Aesthetic trend or structural evolution?", 
        source: "Medium",
        description: "Originating from Apple's promotional mockups, the bento box design language has taken over Saas landing pages. We dissect whether it actually improves data hierarchy.",
        date: "2 days ago"
      },
      { 
        id: "d5", 
        title: "Micro-interactions that define premium digital products", 
        source: "Smashing Mag",
        description: "Small details make the difference. Discover how subtle haptic feedback and fluid UI animations turn regular utility software into addictive digital experiences.",
        date: "3 days ago"
      }
    ]
  }
];

export default function DigestPage() {
  // Estado para controlar qual artigo do resumo está aberto no painel lateral
  const [selectedArticle, setSelectedArticle] = useState<DigestArticle | null>(null);

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Cabeçalho do Digest */}
      <div className="mb-10 pb-6 border-b border-zinc-800">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
          Daily Briefing
        </span>
        <h1 className="text-3xl font-bold text-zinc-100 mt-1">
          Your Digest
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          A curated summary of your subscriptions for <span className="text-zinc-200 font-medium">{todayFormatted}</span>.
        </p>
      </div>

      {/* Seções do Digest */}
      <div className="space-y-10">
        {digestSections.map((section, index) => (
          <section key={index} className="group">
            
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900 group-hover:border-zinc-800 transition-colors">
              <h2 className="text-sm font-semibold text-zinc-400 tracking-wide uppercase">
                {section.category}
              </h2>
              <span className="text-xs text-zinc-600 bg-zinc-900/50 px-2 py-0.5 rounded-md border border-zinc-800/40">
                {section.timeToRead}
              </span>
            </div>

            <div className="space-y-1">
              {section.articles.map((article) => (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)} // DISPARA A ABERTURA AO CLICAR
                  className="flex items-baseline justify-between p-3 rounded-xl hover:bg-zinc-900/40 border border-transparent hover:border-zinc-800/60 cursor-pointer transition-all group/item"
                >
                  <div className="flex items-baseline gap-3 pr-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover/item:bg-blue-500 transition-colors shrink-0" />
                    <h3 className="text-base text-zinc-300 group-hover/item:text-zinc-100 font-medium transition-colors line-clamp-1">
                      {article.title}
                    </h3>
                  </div>
                  
                  <span className="text-xs font-medium text-zinc-500 group-hover/item:text-zinc-400 tracking-wider shrink-0 uppercase">
                    {article.source}
                  </span>
                </div>
              ))}
            </div>

          </section>
        ))}
      </div>

      <div className="mt-12 p-4 bg-zinc-900/20 border border-zinc-800/60 rounded-xl text-center">
        <p className="text-xs text-zinc-500">
          You are all caught up! Next digest generates tomorrow morning.
        </p>
      </div>

      {/* O PAINEL COMPARTILHADO DO READER */}
      <ArticleReader 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </div>
  );
}