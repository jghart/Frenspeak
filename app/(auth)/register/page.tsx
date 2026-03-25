'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuMail, LuLock, LuUser, LuLoader } from 'react-icons/lu';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Registration failed');
                return;
            }

            // Redirect to login page after successful registration
            router.push('/login');
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
                    Create your <span className="gradient-text">account</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Start your TCF B2 training journey
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
                    <label htmlFor="name" className="label">Name</label>
                    <div className="relative">
                        <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input !pl-10"
                            placeholder="Your name"
                            autoComplete="name"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="reg-email" className="label">Email</label>
                    <div className="relative">
                        <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            id="reg-email"
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
                    <label htmlFor="reg-password" className="label">Password</label>
                    <div className="relative">
                        <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            id="reg-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input !pl-10"
                            placeholder="Min. 6 characters"
                            required
                            autoComplete="new-password"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirm-password" className="label">Confirm Password</label>
                    <div className="relative">
                        <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input !pl-10"
                            placeholder="••••••••"
                            required
                            autoComplete="new-password"
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
                        'Create Account'
                    )}
                </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
