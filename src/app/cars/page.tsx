import FetchCar from "@/lib/api";
import React from "react";
import DisplayProductComponent from "@/components/Display";
import type { Car } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Shop",
  description: "This is the car product listing page.",
  keywords: ["car", "discount", "modern", "luxury", "web development"],
  authors: [{ name: "Marta Full Stack" }],
  creator: "Marta",
  openGraph: {
    title: "Car Show Page",
    description: "Explore and order cars from our modern shop.",
    url: "https://yourdomain.com/cars", // Replace with actual domain
    siteName: "Car Shop",
    images: [
      {
        url: "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/m-automobile/xm-label/bmw-xm-label-g09-01-16x9.jpg",
        width: 1200,
        height: 630,
        alt: "Car Listing Preview Image",
      },
    ],
  },
};

const ProductPage = async () => {
  try {
    const cars: Car[] = await FetchCar(0.5);

    if (!cars?.length) {
      return (
        <div className="text-center py-16 text-gray-600">
          No cars available at the moment. Please check back later.
        </div>
      );
    }

    return (
      <main className="px-4 sm:px-8 md:px-16 py-16 bg-gray-50 min-h-screen">
        <DisplayProductComponent
          tagline="Latest Updates"
          heading="New Arrivals"
          description="Explore top car models, reviews, and deals. Stay ahead with the most updated listings of luxury and budget-friendly cars."
          buttonText="View all cars"
          buttonUrl="/cars"
          posts={cars}
          image=""
        />
      </main>
    );
  } catch (error) {
    console.error("Error fetching cars:", error);
    return (
      <div className="text-center py-16 text-red-600 font-medium">
        ⚠️ Failed to load car listings. Please try again later.
      </div>
    );
  }
};

export default ProductPage;
