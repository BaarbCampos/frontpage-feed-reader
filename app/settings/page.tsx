"use client";

import React, { useState, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider"; // Use esta!

type FeedSource = {
  id: string;
  name: string;
  url: string;
  category: string;
};

const initialFeeds: FeedSource[] = [
  { id: "f1", name: "Tech Daily", url: "https://techdaily.com/feed", category: "Tech" },
  { id: "f2", name: "Dev News", url: "https://devnews.io/rss", category: "Tech" },
  { id: "f3", name: "UX Collective", url: "https://uxcollective.cc/feed", category: "Design" },
];

export default function SettingsPage() {
  // Controle de Abas Internas das Configurações
  const [activeTab, setActiveTab] = useState<"profile" | "feeds">("profile");

  // Estados do Perfil
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@frontpage.dev");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [theme, setTheme] = useState<"system" | "light" | "dark">("dark"); // Estado do Tema
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados dos Feeds
  const [feeds, setFeeds] = useState<FeedSource[]>(initialFeeds);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  // Simulação de Upload de Avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Funções de Gerenciamento de Feed
  const handleAddFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newUrl) return;
    const newFeed = { id: String(Date.now()), name: newName, url: newUrl, category: "Tech" };
    setFeeds([...feeds, newFeed]);
    setNewName("");
    setNewUrl("");
  };

  const handleRemoveFeed = (id: string) => {
    setFeeds(feeds.filter((feed) => feed.id !== id));
  };

  const handleOPMLImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      const imported = [
        { id: "f4", name: "The Verge", url: "https://theverge.com/rss", category: "Tech" },
        { id: "f5", name: "Smashing Magazine", url: "https://smashingmag.com/feed", category: "Design" },
      ];
      setFeeds((prev) => [...prev, ...imported]);
      setIsImporting(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 text-zinc-100">
      
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Customize your reading experience, profile metadata, and subscriptions.
        </p>
      </div>

      {/* Navegação por Sub-abas */}
      <div className="flex gap-2 border-b border-zinc-800 mb-8 pb-px">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors px-1 ${
            activeTab === "profile"
              ? "border-blue-500 text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Account & Appearance
        </button>
        <button
          onClick={() => setActiveTab("feeds")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors px-1 ${
            activeTab === "feeds"
              ? "border-blue-500 text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Subscriptions
        </button>
      </div>

      {/* CONTEÚDO DA ABA: PROFILE & APPEARANCE */}
      {activeTab === "profile" && (
        <div className="space-y-8">
          
          {/* Bloco 1: Informações Pessoais */}
          <section className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
            
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div 
                  onClick={triggerFileInput}
                  className="group relative w-24 h-24 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden cursor-pointer flex items-center justify-center transition-all hover:border-zinc-500"
                >
                  {avatar ? (
                    <img src={avatar} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-zinc-500">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-zinc-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    </svg>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                <button onClick={triggerFileInput} className="text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg transition">
                  Change picture
                </button>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-zinc-700 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-zinc-700 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bloco 2: Seletor de Tema Minimalista */}
          <section className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-1">Interface Theme</h2>
            <p className="text-xs text-zinc-500 mb-6">Choose how Frontpage looks on your device.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Opção: Sistema */}
              <div 
                onClick={() => setTheme("system")}
                className={`group relative p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-28 ${
                  theme === "system" 
                    ? "border-blue-500 bg-blue-600/5" 
                    : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${theme === "system" ? "text-blue-400" : "text-zinc-300"}`}>System</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${theme === "system" ? "border-blue-500" : "border-zinc-700"}`}>
                    {theme === "system" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                </div>
                {/* Mini Preview do Layout */}
                <div className="w-full h-8 bg-zinc-900/80 rounded border border-zinc-800/80 mt-2 overflow-hidden flex">
                  <div className="w-1/3 h-full bg-zinc-950 border-r border-zinc-800/40" />
                  <div className="w-2/3 h-full bg-zinc-100" />
                </div>
              </div>

              {/* Opção: Light Mode */}
              <div 
                onClick={() => setTheme("light")}
                className={`group relative p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-28 ${
                  theme === "light" 
                    ? "border-blue-500 bg-blue-600/5" 
                    : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${theme === "light" ? "text-blue-400" : "text-zinc-300"}`}>Light</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${theme === "light" ? "border-blue-500" : "border-zinc-700"}`}>
                    {theme === "light" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                </div>
                {/* Mini Preview do Layout */}
                <div className="w-full h-8 bg-zinc-100 rounded border border-zinc-300 mt-2 overflow-hidden flex">
                  <div className="w-1/3 h-full bg-zinc-200" />
                  <div className="w-2/3 h-full bg-white" />
                </div>
              </div>

              {/* Opção: Dark Mode */}
              <div 
                onClick={() => setTheme("dark")}
                className={`group relative p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-28 ${
                  theme === "dark" 
                    ? "border-blue-500 bg-blue-600/5" 
                    : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-blue-400" : "text-zinc-300"}`}>Dark</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${theme === "dark" ? "border-blue-500" : "border-zinc-700"}`}>
                    {theme === "dark" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                </div>
                {/* Mini Preview do Layout */}
                <div className="w-full h-8 bg-zinc-950 rounded border border-zinc-800 mt-2 overflow-hidden flex">
                  <div className="w-1/3 h-full bg-zinc-900 border-r border-zinc-800" />
                  <div className="w-2/3 h-full bg-zinc-950" />
                </div>
              </div>

            </div>
          </section>

          {/* Botão de Salvar Geral */}
          <div className="flex justify-end">
            <button 
              onClick={() => alert(`Settings saved! Theme set to: ${theme}`)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-sm font-medium rounded-xl text-white transition shadow-lg shadow-blue-600/10"
            >
              Save General Configurations
            </button>
          </div>

        </div>
      )}

      {/* CONTEÚDO DA ABA: SUBSCRIPTIONS */}
      {activeTab === "feeds" && (
        <div className="space-y-8">
          {/* Mantém idêntico ao código anterior de gerenciamento de RSS e OPML */}
          <section className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-1">Add New Subscription</h2>
            <p className="text-xs text-zinc-500 mb-6">Follow a new website or RSS feed URL.</p>
            <form onSubmit={handleAddFeed} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <input type="text" placeholder="Site Name" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <input type="url" placeholder="https://example.com/rss" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none" />
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-medium rounded-xl">Subscribe</button>
            </form>
          </section>

          <section className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-1">Import Data</h2>
                <p className="text-xs text-zinc-500">Migrate subscriptions using an OPML file.</p>
              </div>
              <button onClick={handleOPMLImport} disabled={isImporting} className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-sm font-medium disabled:opacity-50">
                {isImporting ? "Importing..." : "Choose OPML File"}
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">Your Subscriptions ({feeds.length})</h2>
            <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950 mt-4">
              <div className="divide-y divide-zinc-900">
                {feeds.map((feed) => (
                  <div key={feed.id} className="flex items-center justify-between p-4 hover:bg-zinc-900/20 transition">
                    <div>
                      <span className="font-medium text-sm text-zinc-200">{feed.name}</span>
                      <span className="block text-xs text-zinc-500 mt-0.5">{feed.url}</span>
                    </div>
                    <button onClick={() => handleRemoveFeed(feed.id)} className="p-1.5 text-zinc-500 hover:text-red-400 rounded-lg transition">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}