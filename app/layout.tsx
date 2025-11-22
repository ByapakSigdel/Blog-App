import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "MVP Blog Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground min-h-screen transition-colors duration-300`}>
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4 pb-8 pt-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
