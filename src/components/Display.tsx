import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Car } from "@/lib/types";

interface Blog7Props {
  tagline: string;
  heading: string;
  image: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: Car[];
}

export default function DisplayProductComponent({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Explore top car models, reviews, and deals across categories from luxury to budget.",
  buttonText = "View all cars",
  buttonUrl = "",
  posts,
}: Blog7Props) {
  const getValidImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/placeholder-image.jpg";
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
      return imageUrl;
    if (imageUrl.startsWith("/")) return imageUrl;
    return `/${imageUrl}`;
  };

  return (
    <section className="py-24">
      <div className="container mx-auto flex flex-col items-center gap-16 px-4 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 uppercase tracking-wide">
            {tagline}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-6 max-w-2xl text-muted-foreground text-base lg:text-lg">
            {description}
          </p>
          {buttonUrl && (
            <Button variant="link" className="inline-flex items-center" asChild>
              <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
                {buttonText}
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden">
              <a
                href={post.make}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video overflow-hidden"
              >
                <Image
                  src={getValidImageUrl(post.image)}
                  width={500}
                  height={280}
                  alt={post.make || "Car Image"}
                  className="h-full w-full object-cover transition-transform hover:scale-105 duration-200"
                />
              </a>
              <CardHeader className="pt-4 pb-2">
                <h3 className="text-xl font-semibold">
                  <a
                    href={post.make}
                    target="_blank"
                    className="hover:underline"
                  >
                    {post.make || "Unknown Make"}
                  </a>
                </h3>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.description || "No description provided for this car."}
                </p>
              </CardContent>
              <CardFooter className="pt-2 mt-auto">
                <a
                  href={post.make}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
