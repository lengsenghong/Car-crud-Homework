"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

// Schema
const carFormSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().int().gte(1886).lte(new Date().getFullYear()),
  price: z.coerce.number().positive(),
  mileage: z.coerce.number().nonnegative(),
  description: z.string().optional(),
  color: z.string().min(1),
  fuel_type: z.string().min(1),
  transmission: z.string().min(1),
  image: z.string().url({ message: "Must be a valid image URL" }),
});

export default function CreateCarFormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = secureLocalStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    if (!token) {
      setMessage("Please login first to create a car");
    }
  }, []);

  const form = useForm<z.infer<typeof carFormSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(carFormSchema) as any,
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      description: "",
      color: "",
      fuel_type: "",
      transmission: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof carFormSchema>) {
    setIsLoading(true);
    setMessage("");

    try {
      // Get token from localStorage
      const token = secureLocalStorage.getItem("authToken") as string;

      console.log(
        "Token from localStorage:",
        token ? "Token exists" : "No token found"
      );

      if (!token) {
        setMessage("Please login first");
        setIsLoading(false);
        return;
      }

      console.log("Sending request with values:", values);

      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      console.log("Response status:", res.status);

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        const textResponse = await res.text();
        console.error("Response text:", textResponse);
        setMessage("Server error: Invalid response format");
        setIsLoading(false);
        return;
      }

      console.log("Response data:", data);

      if (!res.ok) {
        setMessage(data.message || "Failed to create car");
        console.error("Failed to create car:", data);
        setIsLoading(false);
        return;
      }

      setMessage("Car created successfully!");
      form.reset();
      console.log("Car created:", data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while creating the car");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-[500px] border p-8 rounded-lg mx-auto">
      {/* Authentication Status */}
      {!isAuthenticated && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-md">
          <p className="text-yellow-800 mb-2">
            You need to login to create a car.
          </p>
          <a
            href="/login"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </a>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Display message */}
          {message && (
            <div
              className={`p-3 rounded-md ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          {[
            "make",
            "model",
            "year",
            "price",
            "mileage",
            "color",
            "fuel_type",
            "transmission",
            "image",
          ].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof z.infer<typeof carFormSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{fieldName}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={
                        ["year", "price", "mileage"].includes(fieldName)
                          ? "number"
                          : "text"
                      }
                      placeholder={fieldName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Describe the car..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !isAuthenticated}
          >
            {isLoading ? "Creating..." : "Create Car"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
