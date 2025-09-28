'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
}

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const { resetPassword } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await resetPassword(email)
            setIsSuccess(true)
        } catch (error: any) {
            console.error('Password reset error:', error)
            setError(error.message || 'An error occurred while sending the reset email')
        }

        setIsLoading(false)
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
                <motion.div
                    className="w-full max-w-md"
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                >
                    {/* Logo */}
                    <motion.div variants={fadeInUp} className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Check Your Email</h1>
                        <p className="text-slate-600 dark:text-slate-300">
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center"
                    >
                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            Click the link in the email to reset your password. If you don't see the email, check your spam folder.
                        </p>

                        <div className="space-y-4">
                            <Link
                                href="/login"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                            >
                                <ArrowRight className="w-5 h-5 mr-2" />
                                Back to Sign In
                            </Link>

                            <button
                                onClick={() => {
                                    setIsSuccess(false)
                                    setEmail('')
                                }}
                                className="w-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                Try a different email
                            </button>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="text-center mt-8">
                        <Link
                            href="/"
                            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            ← Back to home
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-md"
                initial="initial"
                animate="animate"
                variants={stagger}
            >
                {/* Logo */}
                <motion.div variants={fadeInUp} className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🔐</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h1>
                    <p className="text-slate-600 dark:text-slate-300">Enter your email address and we'll send you a reset link</p>
                </motion.div>

                {/* Reset Form */}
                <motion.div
                    variants={fadeInUp}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                                <ArrowRight className="w-5 h-5 mr-2" />
                            )}
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-600 dark:text-slate-300">
                            Remember your password?{' '}
                            <Link
                                href="/login"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="text-center mt-8">
                    <Link
                        href="/"
                        className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        ← Back to home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}
