import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "setyawanadi",
  description: "Personal Workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />

        {/* Main Layout - Universal Grid */}
        <div className="flex-1 pt-20 pb-12 px-4 md:px-8 max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Zone A: Main Stage */}
            <main className="lg:col-span-3">
              {children}
            </main>

            {/* Zone B: Sidebar */}
            <aside className="lg:col-span-1 hidden lg:block">
              <Sidebar />
            </aside>
          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}
