'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthChange } from '../lib/firebase';
import { useEffect } from 'react';
import type { User } from 'firebase/auth';

export default function LoginTestPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            setCurrentUser(user);
            if (user) {
                setMessage(`Logged in as: ${user.email}`);
            } else {
                setMessage('Not logged in');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { user, error } = await signInWithEmailAndPassword(email, password);

        if (error) {
            setMessage(`Login Error: ${error}`);
        } else {
            setMessage(`Successfully logged in as: ${user?.email}`);
            setEmail('');
            setPassword('');
        }

        setLoading(false);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { user, error } = await createUserWithEmailAndPassword(email, password);

        if (error) {
            setMessage(`Signup Error: ${error}`);
        } else {
            setMessage(`Successfully created account: ${user?.email}`);
            setEmail('');
            setPassword('');
        }

        setLoading(false);
    };

    const handleLogout = async () => {
        setLoading(true);
        setMessage('');

        const { error } = await signOut();

        if (error) {
            setMessage(`Logout Error: ${error}`);
        } else {
            setMessage('Successfully logged out');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                        Firebase Auth Test
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Test login functionality
                    </p>
                </div>

                {/* Current User Status */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
                    <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                        Current Status:
                    </h2>
                    <p className="text-zinc-900 dark:text-white">
                        {currentUser ? (
                            <>
                                ✅ Logged in as: <span className="font-mono text-sm">{currentUser.email}</span>
                            </>
                        ) : (
                            '❌ Not logged in'
                        )}
                    </p>
                </div>

                {/* Message Display */}
                {message && (
                    <div className={`rounded-lg p-4 ${
                        message.includes('Error')
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                            : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                    }`}>
                        <p className="text-sm">{message}</p>
                    </div>
                )}

                {!currentUser ? (
                    /* Login/Signup Form */
                    <form onSubmit={handleLogin} className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="test@example.com"
                                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Loading...' : 'Login'}
                            </button>

                            <button
                                type="button"
                                onClick={handleSignup}
                                disabled={loading}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Loading...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                ) : (
                    /* Logout Section */
                    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
                        <button
                            onClick={handleLogout}
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Loading...' : 'Logout'}
                        </button>
                    </div>
                )}

                {/* Test Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
                    <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Test Instructions:
                    </h3>
                    <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Try logging in with existing admin credentials</li>
                        <li>• Or create a new account with the "Sign Up" button</li>
                        <li>• Auth state changes are tracked automatically</li>
                        <li>• Check console for any errors</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
