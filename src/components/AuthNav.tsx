"use client";

import { Button } from "@/components/ui/button";
import { isAuthenticated, logout } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthNav() {
  const router = useRouter();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    try {
      logout();
      console.log("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {isAuth ? (
        <>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/dashboard/manipulate">Dashboard</Link>
          </Button>
          <Button
            variant="destructive"
            className="hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            asChild
            className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
}
