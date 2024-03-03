import { loadEnv } from "@/env";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import "./../styles/reset.css";
import { NoScript } from "./no-script";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  authors: [{ name: "Lucas Santos", url: "https://github.com/LucasSantus" }],
  category: "developer",
  creator: "Lucas Santos",
  title: {
    default: "Transcend AI",
    template: "%s · Transcend AI",
  },
  description:
    "Transcend AI is a straightforward yet powerful application that utilizes cutting-edge artificial intelligence to translate text quickly and accurately. Boasting an easy-to-use interface, Transcend AI makes translating between different languages accessible to all, allowing for seamless global communication.",
  keywords: [
    "Lucas Santos",
    "Transcend",
    "Transcend AI",
    "Ai",
    "Translator",
    "Frontend",
    "UX Design",
    "Software",
    "Brazil",
    "Vercel",
    "Next.js",
    "React",
    "TypeScript",
    "TailwindCSS",
  ],
  publisher: "Lucas Santos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await loadEnv();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "scroll-smooth bg-background text-foreground antialiased",
          inter.className,
        )}
      >
        <Providers>
          <NoScript />
          {children}
        </Providers>
      </body>
    </html>
  );
}
