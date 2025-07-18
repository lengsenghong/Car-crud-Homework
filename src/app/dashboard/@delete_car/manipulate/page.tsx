"use client"

import { useState} from "react";
import { getAuthToken, getRefreshToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import secureLocalStorage from "react-secure-storage";

type DeleteCarType = {
    id?: string
    make: string,
    model: string,
    year: number,
    price: number,
    mileage: number,
    description: string,
    color: string,
    fuel_type: string,
    transmission: string,
    image: string
}

const sampleCarData: DeleteCarType = {
    // change the id
    id: "c718704d-366b-441c-94e7-d6864636ddcc",
    make: "I dont know",
    model: "Camry",
    year: 2024,
    price: 37000,
    mileage: 0,
    description: "Brand new Toyota Camry with excellent features",
    color: "Silver",
    fuel_type: "gasoline",
    transmission: "automatic",
    image: "https://car-nextjs-api.cheatdev.online/uploads/82ca35dc-90ac-4991-9daa-3d70f798cae7.png"
};

export default function DeleteFunction(){
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [carData, setCarData] = useState<DeleteCarType | null>(null);

    // this is for refresh for expired token 😎😎😎😎
    const refreshAccessToken = async () => {
        setRefreshing(true);
        setError('');
        setMessage('');

        try {
            const refreshToken = getRefreshToken();
            console.log("Refresh token:", refreshToken ? "Found" : "Missing");

            if (!refreshToken) {
                throw new Error('No refresh token found. Please login again.');
            }

            // Call your refresh token API (server-side)
            const response = await fetch('/api/refresh', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to refresh token');
            }

            const data = await response.json();
            console.log('Token refresh response:', data);

            // Store the new access token
            if (data.token || data.access_token) {
                const newToken = data.token || data.access_token;
                secureLocalStorage.setItem("authToken", newToken);
                console.log(' New access token stored successfully');
                setMessage('Access token refreshed successfully!');
            } else {
                throw new Error('No new access token received');
            }

            // Update refresh token if provided
            if (data.refreshToken || data.refresh_token) {
                const newRefreshToken = data.refreshToken || data.refresh_token;
                secureLocalStorage.setItem("refreshToken", newRefreshToken);
            }

        } catch (error) {
            console.error('Token refresh error:', error);
            setError(error instanceof Error ? error.message : 'Failed to refresh token');
        } finally {
            setRefreshing(false);
        }
    };
    // handle create function 😎
    const deleteCar = async (userData: DeleteCarType) => {
        const access_token = getAuthToken();
        console.log("The access_token", access_token ? "Found" : "Missing");

        if (!access_token) {
            throw new Error('No access token found. Please login or refresh your token.');
        }

        const response = await fetch(`https://car-nextjs-api.cheatdev.online/cars/${sampleCarData?.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();

            // If token expired, suggest refresh
            if (response.status === 401) {
                throw new Error('Access token expired. Please refresh your token.');
            }

            throw new Error(errorData.message || 'Failed to delete car');
        }

        const data = await response.json();
        return data;
    };

    // handle submission create the car
    const handleCreateCar = async () => {
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const result = await deleteCar(sampleCarData);
            setCarData(result);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to deleted car');
            console.error('Error updating car:', error);
        } finally {
            setLoading(false);
        }
    };

    // Check current token status make sure the token is available or not
    const checkTokenStatus = () => {
        const accessToken = getAuthToken();
        const refreshToken = getRefreshToken();

        console.log('=== TOKEN STATUS 😎 ===');
        console.log('Access Token:', accessToken ? 'Available' : 'Missing');
        console.log('Refresh Token:', refreshToken ? 'Available' : 'Missing');

        alert(`Access Token: ${accessToken ? 'Available' : 'Missing'}\nRefresh Token: ${refreshToken ? 'Available' : 'Missing'}`);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-md mx-auto text-center">
                <h1 className="text-2xl font-bold mb-6">Delete Car</h1>

                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-2">Car to be deleted:</h3>
                    <p>ID: {sampleCarData.id}</p>
                    <p>{sampleCarData.year} {sampleCarData.make} {sampleCarData.model}</p>
                    <p>Price: ${sampleCarData.price.toLocaleString()}</p>
                    <p>Color: {sampleCarData.color}</p>
                </div>
                {/* handle button create car */}
                <div className="space-y-3 mb-6">
                    <Button
                        onClick={handleCreateCar}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? 'Deleting Car...' : 'Delete Car Now'}
                    </Button>
                    {/* button handle renew accesstoken */}
                    {/* <Button
                        onClick={refreshAccessToken}
                        disabled={refreshing}
                        variant="outline"
                        className="w-full"
                    >
                        {refreshing ? 'Refreshing Token...' : '🔄 Refresh Access Token'}
                    </Button> */}
                    {/* status check up tha token ng der ot*/}
                    <Button
                        onClick={checkTokenStatus}
                        variant="secondary"
                        size="sm"
                        className="w-full"
                    >
                        Check Token Status
                    </Button>
                </div>
                {/* error that occur */}
                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
                        {error}
                    </div>
                )}
                {/* bos message  */}

                {message && (
                    <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded mb-4">
                        {message}
                    </div>
                )}

                {/* preview data  */}
                {carData && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 text-green-500">Deleted Car Successfully</h3>
                        {/* <pre className="text-sm text-left overflow-auto max-h-48">
                            {JSON.stringify(carData, null, 2)}
                        </pre> */}
                    </div>
                )}
            </div>
        </div>
    );
}