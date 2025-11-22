import type { Metadata } from "next";
import { Inter, Spectral } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const spectral = Spectral({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"], 
  variable: '--font-serif' 
});

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
      <body className={`${inter.variable} ${spectral.variable} font-serif bg-background text-foreground min-h-screen transition-colors duration-300 antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4 pb-8 pt-4 max-w-5xl">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
