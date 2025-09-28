'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, RotateCcw, Home, BarChart3, PieChart } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { getTestConfig, getAllTestCodes } from '../../../test-configs.js'
import { PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function generateStaticParams() {
    const testCodes = getAllTestCodes()
    return testCodes.map((testId) => ({
        testId: testId,
    }))
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

export default function TestResultPage() {
    const params = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const testId = params.testId as string
    const savedTestId = searchParams.get('testId') // For loading historical tests
    const { user, loading: authLoading } = useAuth()

    const [questions, setQuestions] = useState<any[]>([])
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
    const [testConfig, setTestConfig] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    // Authentication check - moved after all hooks
    useEffect(() => {
        if (authLoading) return // Still loading
        if (!user) {
            router.push('/login')
        }
    }, [user, authLoading, router])

    useEffect(() => {
        // Exit fullscreen when test is completed
        const exitFullscreen = async () => {
            try {
                // Check if document is active and currently in fullscreen
                if (document.visibilityState === 'visible' && document.hasFocus()) {
                    const isFullscreen = !!(
                        document.fullscreenElement ||
                        (document as any).webkitFullscreenElement ||
                        (document as any).mozFullScreenElement ||
                        (document as any).msFullscreenElement
                    )

                    if (isFullscreen) {
                        if (document.exitFullscreen) {
                            await document.exitFullscreen()
                        } else if ((document as any).webkitExitFullscreen) {
                            await (document as any).webkitExitFullscreen()
                        } else if ((document as any).mozCancelFullScreen) {
                            await (document as any).mozCancelFullScreen()
                        } else if ((document as any).msExitFullscreen) {
                            await (document as any).msExitFullscreen()
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to exit fullscreen:', error)
            }
        }

        // Delay execution to ensure document is ready
        const timeoutId = setTimeout(exitFullscreen, 100)

        return () => clearTimeout(timeoutId)
    }, [])

    useEffect(() => {
        const config = getTestConfig(testId);
        if (!config) {
            router.push('/tests')
            return
        }
        setTestConfig(config)

        // Load questions
        const loadTestData = async () => {
            try {
                const response = await fetch(config.apiUrl)
                if (!response.ok) {
                    throw new Error('Failed to fetch questions')
                }
                const data = await response.json()
                setQuestions(data.questions)
            } catch (err) {
                console.error('Failed to load test data')
            }
        }

        // Load test data based on whether it's a saved test or just completed
        const loadTestResults = async () => {
            if (savedTestId && user) {
                // Load from database for historical tests
                try {
                    const response = await fetch(`/api/tests/${savedTestId}`, {
                        headers: {
                            'Authorization': `Bearer ${user.uid}`
                        }
                    })

                    if (response.ok) {
                        const testData = await response.json()
                        // Convert answers array back to object format
                        const answersObject: Record<number, number> = {}
                        testData.answers.forEach((answer: number, index: number) => {
                            if (answer !== null && answer !== undefined) {
                                answersObject[index] = answer
                            }
                        })
                        setSelectedAnswers(answersObject)
                    } else {
                        console.error('Failed to load saved test data')
                        // Fallback to localStorage
                        const storedAnswers = localStorage.getItem(`test-${testId}-answers`)
                        if (storedAnswers) {
                            setSelectedAnswers(JSON.parse(storedAnswers))
                        }
                    }
                } catch (error) {
                    console.error('Error loading saved test:', error)
                    // Fallback to localStorage
                    const storedAnswers = localStorage.getItem(`test-${testId}-answers`)
                    if (storedAnswers) {
                        setSelectedAnswers(JSON.parse(storedAnswers))
                    }
                }
            } else {
                // Load from localStorage for just-completed tests
                const storedAnswers = localStorage.getItem(`test-${testId}-answers`)
                if (storedAnswers) {
                    setSelectedAnswers(JSON.parse(storedAnswers))
                }
            }
        }

        loadTestData()
        loadTestResults()
        setLoading(false)
    }, [testId, savedTestId, user, router])

    // Early returns after all hooks
    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-300">Checking authentication...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null // Will redirect to login
    }

    const calculateScore = () => {
        let correct = 0
        let total = questions.length
        let attempted = 0

        questions.forEach((question, index) => {
            if (selectedAnswers[index] !== undefined) {
                attempted++
                if (selectedAnswers[index] === question.answerId) {
                    correct++
                }
            }
        })

        const wrong = attempted - correct
        const unattempted = total - attempted

        return { correct, wrong, unattempted, total, percentage: Math.round((correct / total) * 100) }
    }

    const resetTest = () => {
        localStorage.removeItem(`test-${testId}-answers`)
        router.push(`/test/${testId}`)
    }

    if (loading || !testConfig) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-300">Loading results...</p>
                </div>
            </div>
        )
    }

    const { correct, wrong, unattempted, total, percentage } = calculateScore()

    const pieData = [
        { name: 'Correct', value: correct, color: '#10B981' },
        { name: 'Wrong', value: wrong, color: '#EF4444' },
        { name: 'Unattempted', value: unattempted, color: '#6B7280' }
    ]

    const barData = [
        { name: 'Marks', correct: correct, total: total }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
                    >
                        <div className="text-center mb-8">
                            <div className={`w-20 h-20 bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Test Completed!</h1>
                            <p className="text-slate-600 dark:text-slate-300">{testConfig.name} Practice Test</p>
                        </div>

                        {/* Score Card */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className={`bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]} text-white p-6 rounded-xl text-center`}>
                                <div className="text-3xl font-bold mb-2">{correct}</div>
                                <div className="text-white/80">Correct Answers</div>
                            </div>
                            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl text-center">
                                <div className="text-3xl font-bold mb-2">{wrong}</div>
                                <div className="text-white/80">Wrong Answers</div>
                            </div>
                            <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-xl text-center">
                                <div className="text-3xl font-bold mb-2">{unattempted}</div>
                                <div className="text-white/80">Unattempted</div>
                            </div>
                            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl text-center">
                                <div className="text-3xl font-bold mb-2">{percentage}%</div>
                                <div className="text-green-100">Score</div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Pie Chart */}
                            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                                    <PieChart className="w-5 h-5 mr-2" />
                                    Answer Distribution
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RechartsPieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '6px',
                                                color: 'hsl(var(--foreground))'
                                            }}
                                        />
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Bar Chart */}
                            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                                    <BarChart3 className="w-5 h-5 mr-2" />
                                    Performance Overview
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={barData}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="hsl(var(--muted-foreground))"
                                            opacity={0.3}
                                        />
                                        <XAxis
                                            dataKey="name"
                                            stroke="hsl(var(--foreground))"
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="hsl(var(--foreground))"
                                            fontSize={12}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '6px',
                                                color: 'hsl(var(--foreground))'
                                            }}
                                        />
                                        <Legend
                                            wrapperStyle={{ color: 'hsl(var(--foreground))' }}
                                        />
                                        <Bar dataKey="correct" fill="#10B981" name="Correct" />
                                        <Bar dataKey="total" fill="#6B7280" name="Total" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/test/${testId}/response`}
                                className={`flex items-center justify-center px-6 py-3 bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]} text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200`}
                            >
                                Check Your Responses
                            </Link>
                            <button
                                onClick={resetTest}
                                className="flex items-center justify-center px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Retake Test
                            </button>
                            <Link
                                href="/"
                                className="flex items-center justify-center px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Back to Tests
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
