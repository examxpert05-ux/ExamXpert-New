'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Menu, X, Sun, Moon, User, LogOut, Home, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useAuth } from '@/lib/AuthContext'
import { Button } from '@/components/ui/button'

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/tests', label: 'Tests' },
    { href: '/blog', label: 'Resources' },
    { href: '/about', label: 'About' },
    { href: '/admin', label: 'Admin' }
]

const authenticatedNavItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/tests', label: 'Tests' },
    { href: '/blog', label: 'Resources' },
    { href: '/about', label: 'About' },
    { href: '/admin', label: 'Admin' }
]

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const { user, loading, logout } = useAuth()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const handleSignOut = async () => {
        await logout()
    }

    return (
        <motion.nav
            className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/20 dark:border-slate-700/20"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                            <span className="text-2xl font-black text-white">E</span>
                        </div>
                        <div className="flex flex-col">
                            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                                ExamXpert
                            </Link>
                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                Your Exam,<br className="md:hidden" /> Our Responsibility
                            </span>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {(user ? authenticatedNavItems : navItems).map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                            >
                                <Link
                                    href={item.href}
                                    className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Theme Toggle & CTA */}
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-10 h-10"
                            aria-label="Toggle between light and dark theme"
                            title="Toggle theme"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {loading ? (
                            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                        ) : user ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-medium hidden sm:block">
                                        {user.displayName || user.email}
                                    </span>
                                </div>
                                <Button
                                    onClick={handleSignOut}
                                    variant="outline"
                                    size="sm"
                                    className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link href="/login">
                                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25">
                                            Sign In
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isOpen}
                            title={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        className="md:hidden border-t border-slate-200/20 dark:border-slate-700/20"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {(user ? authenticatedNavItems : navItems).map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 rounded-md transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3 space-y-2">
                                {user ? (
                                    <>
                                        <div className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
                                            Signed in as {user.displayName || user.email}
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.4 }}
                                        >
                                            <button
                                                onClick={() => {
                                                    handleSignOut()
                                                    setIsOpen(false)
                                                }}
                                                className="w-full px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 rounded-md transition-colors text-left flex items-center"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    </>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.4 }}
                                    >
                                        <Link
                                            href="/login"
                                            className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md text-center"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}
