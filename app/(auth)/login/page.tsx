'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuMail, LuLock, LuLoader } from 'react-icons/lu';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            {/* Logo */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
                    <span className="text-white font-bold text-2xl">F</span>
                </div>
                <h1 className="text-2xl font-bold">
                    Welcome to <span className="gradient-text">FrenSpeak</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Sign in to your TCF training account
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="card space-y-4">
                {error && (
                    <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="label">Email</label>
                    <div className="relative">
                        <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input !pl-10"
                            placeholder="you@example.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="label">Password</label>
                    <div className="relative">
                        <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input !pl-10"
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full btn-lg"
                >
                    {loading ? (
                        <LuLoader className="w-4 h-4 animate-spin" />
                    ) : (
                        'Sign In'
                    )}
                </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-primary hover:underline font-medium">
                    Create one
                </Link>
            </p>
        </div>
    );
}
