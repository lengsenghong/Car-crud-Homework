"use client";

import { useState } from "react";
import { getAuthToken, getRefreshToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import secureLocalStorage from "react-secure-storage";

type UpdateCarType = {
    id?: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    description: string;
    color: string;
    fuel_type: string;
    transmission: string;
    image: string;
    is_sold: boolean;
};

const sampleCarData: UpdateCarType = {
    id: "0ef79a0d-8167-4a02-960e-a0a7eab8691b",
    make: "Cyber Truck",
    model: "Camry2",
    year: 2025,
    price: 137000,
    mileage: 0,
    description: "Brand new Toyota Camry with excellent features",
    color: "Silver",
    fuel_type: "gasoline",
    transmission: "automatic",
    image:
        "https://car-nextjs-api.cheatdev.online/uploads/41ff38ec-87ad-4ac1-86e3-f1a7e99c04df.png",
    is_sold: false,
};

export default function UpdateFunction() {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [carData, setCarData] = useState<UpdateCarType | null>(null);

    const refreshAccessToken = async () => {
        setRefreshing(true);
        setError("");
        setMessage("");

        try {
            const refreshToken = getRefreshToken();
            console.log("Refresh token:", refreshToken ? "Found" : "Missing");

            if (!refreshToken) {
                throw new Error("No refresh token found. Please login again.");
            }

            const response = await fetch("/api/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to refresh token");
            }

            const newToken = data.token || data.access_token;
            const newRefresh = data.refreshToken || data.refresh_token;

            if (!newToken) {
                throw new Error("No new access token received");
            }

            secureLocalStorage.setItem("authToken", newToken);
            if (newRefresh) {
                secureLocalStorage.setItem("refreshToken", newRefresh);
            }

            console.log("Token refreshed and stored.");
            setMessage("Access token refreshed successfully!");
        } catch (error) {
            console.error("Token refresh error:", error);
            setError(error instanceof Error ? error.message : "Failed to refresh token");
        } finally {
            setRefreshing(false);
        }
    };

    const updateCar = async (userData: UpdateCarType) => {
        if (!userData.id) {
            throw new Error("Car ID is required for update");
        }

        let token = getAuthToken();
        if (!token) {
            throw new Error("No access token found. Please login or refresh your token.");
        }

        const attemptUpdate = async (tokenToUse: string) => {
            return await fetch(`https://car-nextjs-api.cheatdev.online/cars/${userData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenToUse}`,
                },
                body: JSON.stringify(userData),
            });
        };

        let response = await attemptUpdate(token);

        // if token expired
        if (response.status === 401) {
            console.warn("Access token expired, attempting to refresh...");

            try {
                await refreshAccessToken(); // this also updates localStorage
                token = getAuthToken();
                if (!token) throw new Error("No new token found after refresh.");
                response = await attemptUpdate(token);
            } catch (refreshErr) {
                throw new Error("Failed to refresh token.");
            }
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update car");
        }

        return await response.json();
    };

    const handleCreateCar = async () => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const result = await updateCar(sampleCarData);
            setMessage("Car updated successfully!");
            setCarData(result);
            console.log("Car updated:", result);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to update car");
            console.error("Error updating car:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkTokenStatus = () => {
        const accessToken = getAuthToken();
        const refreshToken = getRefreshToken();

        console.log("=== TOKEN STATUS ===");
        console.log("Access Token:", accessToken || "Missing");
        console.log("Refresh Token:", refreshToken || "Missing");

        alert(
            `Access Token: ${accessToken ? "✅ Available" : "❌ Missing"}\n` +
            `Refresh Token: ${refreshToken ? "✅ Available" : "❌ Missing"}`
        );
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-md mx-auto text-center">
                <h1 className="text-2xl font-bold mb-6">Update Car</h1>

                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-2">Car to be updated:</h3>
                    <p>ID: {sampleCarData.id}</p>
                    <p>
                        {sampleCarData.year} {sampleCarData.make} {sampleCarData.model}
                    </p>
                    <p>Price: ${sampleCarData.price.toLocaleString()}</p>
                    <p>Color: {sampleCarData.color}</p>
                </div>

                <div className="space-y-3 mb-6">
                    <Button onClick={handleCreateCar} disabled={loading} className="w-full">
                        {loading ? "Updating Car..." : "Update Car Now"}
                    </Button>

                    <Button
                        onClick={refreshAccessToken}
                        disabled={refreshing}
                        variant="outline"
                        className="w-full"
                    >
                        {refreshing ? "Refreshing Token..." : "🔄 Refresh Access Token"}
                    </Button>

                    <Button
                        onClick={checkTokenStatus}
                        variant="secondary"
                        size="sm"
                        className="w-full"
                    >
                        Check Token Status
                    </Button>
                </div>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded mb-4">
                        {message}
                    </div>
                )}

                {carData && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Updated Car Details:</h3>
                        <pre className="text-sm text-left overflow-auto max-h-48">
              {JSON.stringify(carData, null, 2)}
            </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
