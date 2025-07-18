'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            await loginUser({ email, password });
            router.push('/cars'); // Redirect to products page
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-md mx-auto text-center">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                <div className="space-y-4 mb-6">
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
                    <Button onClick={handleLogin} disabled={loading} className="w-full">
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    <p className="text-sm">
                        Don’t have an account?{' '}
                        <a href="/signup" className="text-blue-500 hover:underline">
                            Sign up
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