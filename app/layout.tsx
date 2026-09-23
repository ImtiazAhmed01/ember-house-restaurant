/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { BookingProvider } from "@/context/BookingContext";
import { ToastProvider } from "@/context/ToastContext";
import { NavBar } from "@/components/layout/NavBar";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { CartDrawer } from "@/components/layout/CartDrawer";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%231B1B16'/%3E%3Ctext x='50' y='68' font-size='58' text-anchor='middle' fill='%23E3A008'%3EE%3C/text%3E%3C/svg%3E" />
      </head>
      <body
        className="min-h-screen bg-paper text-ink antialiased"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <BookingProvider>
                <ToastProvider>
                  <NavBar />
                  <main className="mx-auto min-h-[70vh] max-w-6xl pb-24 sm:pb-10">
                    {children}
                  </main>
                  <MobileTabBar />
                  <CartDrawer />
                </ToastProvider>
              </BookingProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
