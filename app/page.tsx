"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para o dashboard ao carregar a página inicial
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-400">
      <p>Carregando seu Frontpage...</p>
    </div>
  );
}