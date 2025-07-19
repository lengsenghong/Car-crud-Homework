import BlogComponent from "@/components/BlogComponent";
import { Metadata } from "next";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const metadata: Metadata = {
  title: "Car Shop",
  description: "This is blog per 1",
  keywords: ["product", "discount", "modern", "test", "web development"],
  authors: [{ name: "Marta Full Stack" }],
  creator: "Matra",
  openGraph: {
    title: "Car Blog",
    description: "Car shop website that you can explore and order",
    url: "",
    siteName: "Blog",
    images: [
      {
        url: "https://www.bowkermotorgroup.co.uk/wp-content/uploads/2024/04/gkl-1.jpg",
        width: 1200,
        height: 630,
        alt: "Car Rental Open Graph Image",
      },
    ],
  },
};

// fetchData
async function fetchData(params: number) {
  const res = await fetch(`${BASE_URL}/${params}`);
  const dataRes = res.json();
  return dataRes;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const post = await fetchData((await params).id);
  return (
    <BlogComponent
      key={post.id}
      id={post.id}
      userId={post.userId}
      title={post.title}
      body={post.body}
    />
  );
}
