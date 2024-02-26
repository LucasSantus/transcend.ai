import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import "./../styles/reset.css";
import { NoScript } from "./no-script";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transcend AI",
  description:
    "Transcend AI is a straightforward yet powerful application that utilizes cutting-edge artificial intelligence to translate text quickly and accurately. Boasting an easy-to-use interface, Transcend AI makes translating between different languages accessible to all, allowing for seamless global communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
