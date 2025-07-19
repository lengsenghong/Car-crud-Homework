"use client";

import { Button } from "@/components/ui/button";
import AuthNav from "@/components/AuthNav";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gap-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        Welcome to Car Listings
      </h1>
      <p className="text-muted-foreground max-w-md">
        Discover a wide range of cars, create your own listings, or manage your
        account.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/cars">Show Cars</Link>
        </Button>
        <AuthNav />
      </div>
    </div>
  );
}
