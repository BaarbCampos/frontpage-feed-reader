import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
// ADICIONE ESSA LINHA ABAIXO PARA SUMIR COM O ERRO VERMELHO:
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <Sidebar />

          <main className="flex-1">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}