import { Suspense } from "react";
import "../globals.css";

import BlogListSkeleton from "@/components/Skelaton";
import StyledComponentsRegistry from "@/lib/register";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Car Shop",
  description: "This is blog page",
  keywords: ["product", "discount", "modern", "test", "web development"],
  authors: [{ name: "Marta Full Stack" }],
  creator: "Matra",
  openGraph: {
    title: "Car Blogs",
    description: "Car shop website that you can explore and order",
    url: "",
    siteName: "Car Rental",
    images: [
      {
        url: "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/m-automobile/xm-label/bmw-xm-label-g09-01-16x9.jpg",
        width: 1200,
        height: 630,
        alt: "Car Rental Open Graph Image",
      },
    ],
  },
};
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center">
      <StyledComponentsRegistry>
        <Suspense fallback={<BlogListSkeleton />}>{children}</Suspense>
      </StyledComponentsRegistry>
    </div>
  );
}
