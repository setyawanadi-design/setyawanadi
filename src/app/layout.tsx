import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { Sidebar } from "@/components/shell/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "setyawanadi",
  description: "Personal Workspace",
};

import { getPinnedLogs, getLogPosts } from "@/lib/mdx";

// ... [Metadata export stays same]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pinnedLogs = getPinnedLogs();
  const recentLogs = getLogPosts().slice(0, 4);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Header />

        {/* Main Layout - Universal Grid */}
        <div className="flex-1 pt-20 pb-12 px-2 md:px-4 max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 h-full">
            {/* Zone A: Main Stage */}
            <main className="min-w-0">
              {children}
            </main>

            {/* Zone B: Sidebar */}
            <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] self-start">
              <Sidebar pinnedLogs={pinnedLogs} recentLogs={recentLogs} />
            </aside>
          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}
