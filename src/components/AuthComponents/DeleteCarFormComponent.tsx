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
import { Switch } from "@/components/ui/switch";

const deleteCarSchema = z.object({
  id: z.string().min(1, { message: "Car ID is required" }),
});

export default function DeleteCarFormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = secureLocalStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    if (!token) {
      setMessage("Please login first to delete a car");
    }
  }, []);

  const form = useForm<z.infer<typeof deleteCarSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(deleteCarSchema) as any,
    defaultValues: {
      id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof deleteCarSchema>) {
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

      console.log("Sending delete request with values:", values);

      const res = await fetch("/api/delete", {
        method: "DELETE",
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
        let errorMessage = data.message || "Failed to delete car";
        if (res.status === 403) {
          errorMessage =
            "Lub Car bos yg create.";
        } else if (res.status === 404) {
          errorMessage = "Car not found. It may have already been deleted.";
        } else if (res.status === 401) {
          errorMessage = "Authentication failed. Please login again.";
        }

        setMessage(errorMessage);
        console.error("Failed to delete car:", data);
        console.error("Status:", res.status, "StatusText:", res.statusText);
        setIsLoading(false);
        return;
      }

      setMessage("Car deleted successfully!");
      form.reset();
      console.log("Car deleted:", data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while deleting the car");
    } finally {
      setIsLoading(false);
    }
  }

  const fields = ["id"] as const;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Authentication Status */}
      {!isAuthenticated && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-md">
          <p className="text-yellow-800 mb-2">
            You need to login to delete a car.
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 bg-white rounded-lg shadow-md"
        >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 capitalize">
                      {fieldName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={
                          ["year", "price", "mileage"].includes(fieldName)
                            ? "number"
                            : "text"
                        }
                        placeholder={`Enter ${fieldName}`}
                        className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              disabled={isLoading || !isAuthenticated}
            >
              {isLoading ? "Deleting..." : "Delete Car"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
