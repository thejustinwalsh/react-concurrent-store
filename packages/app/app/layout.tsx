import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nav } from "./nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Concurrent Store",
  description:
    "Live demonstrations of React RFC #35449's createStore/useStore, in real React with no test harness.",
};

/**
 * A server component, and the reason this app is on Next rather than Vite:
 * SSR and RSC are two different things to prove and this serves both from one
 * server.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="top">
          <div className="wrap">
            <h1>Concurrent Store</h1>
          </div>
        </header>
        <Nav />
        {children}
      </body>
    </html>
  );
}
