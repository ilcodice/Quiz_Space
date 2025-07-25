import "./globals.css";
import StarsBackground from "../client/src/components/background/StarsBackground.tsx";
import Navbar from "../client/src/components/custom_components/navbar.tsx";
import Footer from "../client/src/components/custom_components/footer-nav.tsx";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <StarsBackground />
        <main className="relative z-10 min-h-screen w-full">
          <Navbar />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
