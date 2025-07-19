import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car Shop",
  description: "Car Shop Application built with Next.js and React",
  keywords: ["car", "discount", "modern", "luxury", "web development"],
  authors: [{ name: "Marta Full Stack" }],
  creator: "Marta",
  openGraph: {
    title: "Car Shop",
    description: "Car Shop Application built with Next.js and React",
    url: "https://yourdomain.com", // replace with actual domain
    siteName: "Car Shop",
    images: [
      {
        url: "https://imgs.search.brave.com/SVYEabTzcQSVZWQl9wiH3bdeXk-0I0RnY3H21gex6sU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbGlw/YXJ0LWxpYnJhcnku/Y29tL25ld19nYWxs/ZXJ5LzEyMS0xMjE3/NjA4X3Nwb3J0cy1j/YXItY2xpcGFydC1j/YXItY2xpcGFydC13/aXRob3V0LWJhY2tn/cm91bmQucG5n",
        width: 1200,
        height: 630,
        alt: "Car Rental Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav className="bg-gray-800 text-white px-6 py-4 shadow">
            <div className="container mx-auto flex justify-between items-center">
              <div className="space-x-6 font-medium">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <Link href="/cars" className="hover:underline">
                  Cars
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
      </body>
    </html>
  );
}
