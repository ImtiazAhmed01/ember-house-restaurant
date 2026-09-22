import type { Metadata, Viewport } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

export const metadata: Metadata = {
  title: "Ember House — book a table, order ahead",
  description:
    "Ember House is a wood-fired grill and biryani house. Browse the menu, book a table, or order ahead for pickup.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1B1B16",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

      </head>
      <NavBar />
      <main className="mx-auto min-h-[70vh] max-w-6xl pb-24 sm:pb-10">
        {children}
      </main>
      <MobileTabBar />
    </html>
  );
}
