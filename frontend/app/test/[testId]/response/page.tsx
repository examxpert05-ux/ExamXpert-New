'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { getTestConfig, getAllTestCodes } from '../../../test-configs.js'

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

export default function TestResponsePage() {
    const params = useParams()
    const router = useRouter()
    const testId = params.testId as string
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

        // Load selected answers from localStorage
        const storedAnswers = localStorage.getItem(`test-${testId}-answers`)
        if (storedAnswers) {
            setSelectedAnswers(JSON.parse(storedAnswers))
        }

        loadTestData()
        setLoading(false)
    }, [testId, router])

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

    if (loading || !testConfig) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-300">Loading responses...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href={`/test/${testId}/result`}
                                className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Results
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Response Review</h1>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{testConfig.name} Practice Test</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {questions.map((question, index) => {
                            const userAnswer = selectedAnswers[index]
                            const isCorrect = userAnswer === question.answerId
                            const isAnswered = userAnswer !== undefined

                            return (
                                <motion.div
                                    key={question.questionId}
                                    initial="initial"
                                    animate="animate"
                                    variants={fadeInUp}
                                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
                                >
                                    {/* Question */}
                                    <div className="mb-6">
                                        <div className="flex items-start space-x-4">
                                            <span className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]} text-white rounded-full flex items-center justify-center font-semibold text-sm`}>
                                                {index + 1}
                                            </span>
                                            <div className="flex-1">
                                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                                    {question.question}
                                                </h2>
                                                <p className="text-slate-600 dark:text-slate-300 text-lg">
                                                    {question.hindiQuestion}
                                                </p>
                                            </div>
                                            {/* Status Indicator - Desktop Only */}
                                            <div className="flex-shrink-0 hidden md:block">
                                                {isAnswered ? (
                                                    isCorrect ? (
                                                        <div className="flex items-center text-green-600 dark:text-green-400">
                                                            <CheckCircle className="w-6 h-6 mr-2" />
                                                            <span className="font-semibold">Correct</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center text-red-600 dark:text-red-400">
                                                            <XCircle className="w-6 h-6 mr-2" />
                                                            <span className="font-semibold">Wrong</span>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                        <div className="w-6 h-6 mr-2 border-2 border-gray-300 rounded-full"></div>
                                                        <span className="font-semibold">Not Attempted</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Status Indicator - Mobile Only */}
                                        <div className="flex justify-end mt-4 pr-4 md:hidden">
                                            {isAnswered ? (
                                                isCorrect ? (
                                                    <div className="flex items-center text-green-600 dark:text-green-400">
                                                        <CheckCircle className="w-6 h-6 mr-2" />
                                                        <span className="font-semibold">Correct</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center text-red-600 dark:text-red-400">
                                                        <XCircle className="w-6 h-6 mr-2" />
                                                        <span className="font-semibold">Wrong</span>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                    <div className="w-6 h-6 mr-2 border-2 border-gray-300 rounded-full"></div>
                                                    <span className="font-semibold">Not Attempted</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Options */}
                                    <div className="space-y-4">
                                        {question.options.map((option: any) => {
                                            const isSelected = userAnswer === option.optionId
                                            const isCorrectOption = option.optionId === question.answerId
                                            const isUserCorrect = isSelected && isCorrectOption

                                            return (
                                                <div
                                                    key={option.optionId}
                                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${isCorrectOption
                                                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                                                        : isSelected && !isCorrectOption
                                                            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                                                            : 'border-slate-200 dark:border-slate-600'
                                                        }`}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${isSelected
                                                            ? isCorrectOption
                                                                ? 'bg-green-500 border-green-500 text-white'
                                                                : 'bg-red-500 border-red-500 text-white'
                                                            : isCorrectOption
                                                                ? 'border-green-500 text-green-600 dark:text-green-400'
                                                                : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'
                                                            }`}>
                                                            {String.fromCharCode(64 + option.optionId)}
                                                        </span>
                                                        <div className="flex-1">
                                                            <p className={`font-medium ${isCorrectOption
                                                                ? 'text-green-800 dark:text-green-200'
                                                                : isSelected && !isCorrectOption
                                                                    ? 'text-red-800 dark:text-red-200'
                                                                    : 'text-slate-900 dark:text-white'
                                                                }`}>
                                                                {option.text}
                                                            </p>
                                                            <p className={`text-sm mt-1 ${isCorrectOption
                                                                ? 'text-green-600 dark:text-green-300'
                                                                : isSelected && !isCorrectOption
                                                                    ? 'text-red-600 dark:text-red-300'
                                                                    : 'text-slate-600 dark:text-slate-300'
                                                                }`}>
                                                                {option.hindiText}
                                                            </p>
                                                        </div>
                                                        {/* Correct/Wrong Indicator */}
                                                        <div className="flex-shrink-0">
                                                            {isCorrectOption && (
                                                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                            )}
                                                            {isSelected && !isCorrectOption && (
                                                                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
