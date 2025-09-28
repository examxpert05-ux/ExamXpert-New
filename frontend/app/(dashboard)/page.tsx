'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Target, TrendingUp, BookOpen, AlertCircle, X, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import { getTestConfig } from '../test-configs.js'

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

interface UserData {
    id: number
    user_id: string
    username: string
    test_id: string
    test_name: string
    test_date: string
    result: string
    response_data: {
        answers: number[]
        score: number
        timeSpent: number
        questions: string[]
        questionDetails?: any[]
    }
    created_at: string
    updated_at: string
}

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth()
    const [testHistory, setTestHistory] = useState<UserData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedTest, setSelectedTest] = useState<UserData | null>(null)
    const [showAnalyzeModal, setShowAnalyzeModal] = useState(false)
    const [questions, setQuestions] = useState<any[]>([])

    useEffect(() => {
        if (authLoading) return
        if (!user) return

        const fetchTestHistory = async () => {
            try {
                const response = await fetch('/api/tests/history', {
                    headers: {
                        'Authorization': `Bearer ${user.uid}`
                    }
                })

                if (response.ok) {
                    const data = await response.json()
                    setTestHistory(data)
                } else {
                    setError('Failed to load test history')
                }
            } catch (err) {
                setError('Failed to load test history')
                console.error('Error fetching test history:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchTestHistory()
    }, [user, authLoading])

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-300">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h1>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">Please log in to view your dashboard.</p>
                    <Link
                        href="/login"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                    >
                        Log In
                    </Link>
                </div>
            </div>
        )
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const getExamName = (examId: string) => {
        const examNames: { [key: string]: string } = {
            'jee': 'JEE Main',
            'neet': 'NEET',
            'upsc': 'UPSC',
            'cat': 'CAT',
            'gate': 'GATE',
            'ssc': 'SSC',
            'clat': 'CLAT',
            'nda': 'NDA',
            'net': 'NET',
            'banking': 'Banking'
        }
        return examNames[examId] || examId.toUpperCase()
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 dark:text-green-400'
        if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
        return 'text-red-600 dark:text-red-400'
    }

    const totalTests = testHistory.length
    const averageScore = totalTests > 0 ? Math.round(testHistory.reduce((sum, test) => sum + test.response_data.score, 0) / totalTests) : 0
    const totalTime = testHistory.reduce((sum, test) => sum + test.response_data.timeSpent, 0)

    const handleAnalyze = async (test: UserData) => {
        setSelectedTest(test)
        setShowAnalyzeModal(true)

        // Load questions for this test
        try {
            const testConfig = getTestConfig(test.test_name.toLowerCase())
            if (testConfig) {
                const response = await fetch(testConfig.apiUrl)
                if (response.ok) {
                    const data = await response.json()
                    setQuestions(data.questions)
                }
            }
        } catch (error) {
            console.error('Error loading questions:', error)
        }
    }

    const closeModal = () => {
        setShowAnalyzeModal(false)
        setSelectedTest(null)
        setQuestions([])
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Dashboard</h1>
                        <p className="text-slate-600 dark:text-slate-300">Track your progress and review past performances</p>
                    </motion.div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                        >
                            <div className="flex items-center">
                                <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">Total Tests</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalTests}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                        >
                            <div className="flex items-center">
                                <Target className="w-8 h-8 text-green-500 mr-3" />
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">Average Score</p>
                                    <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                        >
                            <div className="flex items-center">
                                <Clock className="w-8 h-8 text-purple-500 mr-3" />
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">Total Time</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatTime(totalTime)}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                        >
                            <div className="flex items-center">
                                <TrendingUp className="w-8 h-8 text-orange-500 mr-3" />
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">Latest Score</p>
                                    <p className={`text-2xl font-bold ${testHistory.length > 0 ? getScoreColor(testHistory[0].response_data.score) : 'text-slate-900 dark:text-white'}`}>
                                        {testHistory.length > 0 ? `${testHistory[0].response_data.score}%` : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Test History */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                    >
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Test History</h2>

                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-slate-600 dark:text-slate-300">Loading test history...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                <p className="text-slate-600 dark:text-slate-300">{error}</p>
                            </div>
                        ) : testHistory.length === 0 ? (
                            <div className="text-center py-12">
                                <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Tests Completed</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">Start taking tests to see your progress here.</p>
                                <Link
                                    href="/tests"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                                >
                                    Take a Test
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {testHistory.map((test, index) => (
                                    <motion.div
                                        key={test.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                <BookOpen className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                                    {test.test_name}
                                                </h3>
                                                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-300">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        {formatDate(test.test_date)}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {formatTime(test.response_data.timeSpent)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className={`text-2xl font-bold ${getScoreColor(test.response_data.score)}`}>
                                                    {test.response_data.score}%
                                                </div>
                                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                                    Score
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleAnalyze(test)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                                            >
                                                Analyze
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Analyze Modal */}
            <AnimatePresence>
                {showAnalyzeModal && selectedTest && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-600">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Test Analysis: {selectedTest.test_name}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                                        Completed on {formatDate(selectedTest.test_date)} • Score: {selectedTest.response_data.score}%
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                                {questions.length > 0 ? (
                                    <div className="space-y-6">
                                        {questions.map((question, index) => {
                                            const userAnswer = selectedTest.response_data.answers[index]
                                            const isCorrect = userAnswer === question.answerId
                                            const isAnswered = userAnswer !== undefined && userAnswer !== null

                                            return (
                                                <div
                                                    key={question.questionId || index}
                                                    className={`p-4 rounded-lg border-2 ${!isAnswered
                                                            ? 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800'
                                                            : isCorrect
                                                                ? 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900'
                                                                : 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900'
                                                        }`}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${!isAnswered
                                                                ? 'bg-gray-400 text-white'
                                                                : isCorrect
                                                                    ? 'bg-green-500 text-white'
                                                                    : 'bg-red-500 text-white'
                                                            }`}>
                                                            {index + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                                                                {question.question}
                                                            </h3>
                                                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                                                                {question.hindiQuestion}
                                                            </p>

                                                            <div className="space-y-2">
                                                                {question.options.map((option: any) => {
                                                                    const isUserChoice = userAnswer === option.optionId
                                                                    const isCorrectChoice = option.optionId === question.answerId

                                                                    return (
                                                                        <div
                                                                            key={option.optionId}
                                                                            className={`p-3 rounded-lg border ${isCorrectChoice
                                                                                    ? 'border-green-500 bg-green-100 dark:border-green-400 dark:bg-green-800'
                                                                                    : isUserChoice && !isCorrectChoice
                                                                                        ? 'border-red-500 bg-red-100 dark:border-red-400 dark:bg-red-800'
                                                                                        : 'border-slate-300 dark:border-slate-600'
                                                                                }`}
                                                                        >
                                                                            <div className="flex items-center space-x-3">
                                                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${isCorrectChoice
                                                                                        ? 'bg-green-500 text-white'
                                                                                        : isUserChoice && !isCorrectChoice
                                                                                            ? 'bg-red-500 text-white'
                                                                                            : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                                                                                    }`}>
                                                                                    {String.fromCharCode(64 + option.optionId)}
                                                                                </div>
                                                                                <div className="flex-1">
                                                                                    <p className={`font-medium ${isCorrectChoice
                                                                                            ? 'text-green-800 dark:text-green-200'
                                                                                            : isUserChoice && !isCorrectChoice
                                                                                                ? 'text-red-800 dark:text-red-200'
                                                                                                : 'text-slate-900 dark:text-white'
                                                                                        }`}>
                                                                                        {option.text}
                                                                                    </p>
                                                                                    <p className={`text-sm ${isCorrectChoice
                                                                                            ? 'text-green-600 dark:text-green-300'
                                                                                            : isUserChoice && !isCorrectChoice
                                                                                                ? 'text-red-600 dark:text-red-300'
                                                                                                : 'text-slate-600 dark:text-slate-300'
                                                                                        }`}>
                                                                                        {option.hindiText}
                                                                                    </p>
                                                                                </div>
                                                                                {isCorrectChoice && (
                                                                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                                                )}
                                                                                {isUserChoice && !isCorrectChoice && (
                                                                                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>

                                                            {!isAnswered && (
                                                                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic">
                                                                    Not answered
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                            Questions Not Available
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300">
                                            Unable to load questions for this test analysis.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
