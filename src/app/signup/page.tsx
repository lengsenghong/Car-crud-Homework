'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/navigation';
import { SignupData, LoginResponse } from '@/lib/types';

const signupUser = async (signupData: SignupData): Promise<LoginResponse> => {
    try {
        if (signupData.password !== signupData.confirmed_password) {
            throw new Error('Passwords do not match');
        }

        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        console.log('=== SIGNUP RESPONSE DEBUG 😎😎 ===');
        console.log('Full response data:', data);
        console.log('data.token:', data.token);
        console.log('data.access_token:', data.access_token);
        console.log('data.refreshToken:', data.refreshToken);
        console.log('data.refresh_token:', data.refresh_token);
        console.log('Available keys:', Object.keys(data));

        const possibleTokenFields = ['token', 'access_token', 'accessToken', 'authToken'];
        const actualTokenField = possibleTokenFields.find(field => data[field]);

        console.log('Detected token field:', actualTokenField);
        if (actualTokenField) {
            console.log('Token value:', data[actualTokenField]);
        } else {
            console.log('Token value: undefined');
        }

        if (actualTokenField && data[actualTokenField]) {
            secureLocalStorage.setItem('authToken', data[actualTokenField]);
            console.log('Token stored successfully');
        } else {
            console.error('No token found in response');
        }

        secureLocalStorage.setItem('user', JSON.stringify(data.user || null));

        const refreshToken = data.refreshToken || data.refresh_token;
        if (refreshToken) {
            secureLocalStorage.setItem('refreshToken', refreshToken);
        }

        return data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        setLoading(true);
        setError('');

        try {
            await signupUser({ username, email, password, confirmed_password: confirmedPassword });
            router.push('/login'); // Redirect to login after signup
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed');
            console.error('Signup error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-md mx-auto text-center">
                <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
                <div className="space-y-4 mb-6">
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        disabled={loading}
                    />
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        disabled={loading}
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        disabled={loading}
                    />
                    <Input
                        type="password"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        placeholder="Confirm Password"
                        disabled={loading}
                    />
                    <Button onClick={handleSignup} disabled={loading} className="w-full">
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                    <p className="text-sm">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}