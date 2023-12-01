import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { classNames } from "@/utils/classnames";
import { Navbar } from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Web Portal | Library XYZ",
  description: "Get your bookings done here.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={classNames(inter.className, "h-full")}>
        <div className="min-h-full">
          <Navbar />

          <div className="py-10">
            <header>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Dashboard
                </h1>
              </div>
            </header>
            <main>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
