'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ChevronLeft, ChevronRight, CheckCircle, XCircle, RotateCcw, Home, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { getTestConfig } from '../../test-configs.js'

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

const slideIn = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
}

export default function DynamicTestPage() {
    const params = useParams()
    const router = useRouter()
    const testId = params.testId as string
    const { user, loading: authLoading } = useAuth()

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
    const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0])) // Track visited questions, start with first question
    const [timeLeft, setTimeLeft] = useState(0)
    const [isActive, setIsActive] = useState(true)
    const [questions, setQuestions] = useState<any[]>([])
    const [testConfig, setTestConfig] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [fullscreenWarning, setFullscreenWarning] = useState(false)
    const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false)

    // Authentication check - moved after all hooks
    useEffect(() => {
        if (authLoading) return // Still loading
        if (!user) {
            router.push('/login')
        }
    }, [user, authLoading, router])

    // Load test data dynamically
    useEffect(() => {
        const config = getTestConfig(testId);
        if (!config) {
            setError("Test configuration not found");
            setLoading(false);
            return;
        }
        setTestConfig(config);

        const loadTestData = async () => {
            try {
                const response = await fetch(config.apiUrl) // Use the apiUrl from the config
                if (!response.ok) {
                    throw new Error('Failed to fetch questions')
                }
                const data = await response.json()
                setQuestions(data.questions)
                setTimeLeft(config.duration)
                setLoading(false)
            } catch (err) {
                setError('Failed to load test data')
                setLoading(false)
            }
        }

        loadTestData()
    }, [testId])

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

    // Fullscreen functionality
    const enterFullscreen = async () => {
        try {
            const element = document.documentElement
            if (element.requestFullscreen) {
                await element.requestFullscreen()
            } else if ((element as any).webkitRequestFullscreen) {
                await (element as any).webkitRequestFullscreen()
            } else if ((element as any).mozRequestFullScreen) {
                await (element as any).mozRequestFullScreen()
            } else if ((element as any).msRequestFullscreen) {
                await (element as any).msRequestFullscreen()
            }
        } catch (error) {
            console.error('Failed to enter fullscreen:', error)
        }
    }

    const exitFullscreen = async () => {
        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen()
            } else if ((document as any).webkitExitFullscreen) {
                await (document as any).webkitExitFullscreen()
            } else if ((document as any).mozCancelFullScreen) {
                await (document as any).mozCancelFullScreen()
            } else if ((document as any).msExitFullscreen) {
                await (document as any).msExitFullscreen()
            }
        } catch (error) {
            console.error('Failed to exit fullscreen:', error)
        }
    }

    // Request fullscreen when test starts
    useEffect(() => {
        if (!loading && questions.length > 0 && !isFullscreen) {
            enterFullscreen()
        }
    }, [loading, questions.length, isFullscreen])

    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!(
                document.fullscreenElement ||
                (document as any).webkitFullscreenElement ||
                (document as any).mozFullScreenElement ||
                (document as any).msFullscreenElement
            )
            setIsFullscreen(isCurrentlyFullscreen)

            if (!isCurrentlyFullscreen && questions.length > 0) {
                // User exited fullscreen during test
                setFullscreenWarning(true)
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
        document.addEventListener('mozfullscreenchange', handleFullscreenChange)
        document.addEventListener('MSFullscreenChange', handleFullscreenChange)

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
        }
    }, [questions.length])

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isActive && timeLeft > 0 && !loading) {
            interval = setInterval(() => {
                setTimeLeft((time) => {
                    if (time <= 1) {
                        setIsActive(false)
                        // Auto-submit when time is up
                        localStorage.setItem(`test-${testId}-answers`, JSON.stringify(selectedAnswers))
                        router.push(`/test/${testId}/result`)
                        return 0
                    }
                    return time - 1
                })
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [isActive, timeLeft, loading, selectedAnswers, testId, router])

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleAnswerSelect = (questionIndex: number, optionId: number) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: optionId
        }))
    }

    const calculateScore = () => {
        let correct = 0
        let total = 0

        questions.forEach((question, index) => {
            total++
            if (selectedAnswers[index] === question.answerId) {
                correct++
            }
        })

        return { correct, total, percentage: Math.round((correct / total) * 100) }
    }

    const isAllQuestionsAnswered = () => {
        return questions.length > 0 && questions.every((_, index) => selectedAnswers[index] !== undefined)
    }

    const handleSubmitAttempt = () => {
        if (isAllQuestionsAnswered()) {
            setShowSubmitConfirmation(true)
        } else {
            // If not all questions are answered, show a message or just submit anyway
            submitTest()
        }
    }

    const confirmSubmit = () => {
        setShowSubmitConfirmation(false)
        submitTest()
    }

    const cancelSubmit = () => {
        setShowSubmitConfirmation(false)
    }

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            const nextIndex = currentQuestion + 1
            setVisitedQuestions(prev => new Set([...prev, nextIndex]))
            setCurrentQuestion(nextIndex)
        }
    }

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            const prevIndex = currentQuestion - 1
            setVisitedQuestions(prev => new Set([...prev, prevIndex]))
            setCurrentQuestion(prevIndex)
        }
    }

    const goToQuestion = (index: number) => {
        setVisitedQuestions(prev => new Set([...prev, index]))
        setCurrentQuestion(index)
    }

    const submitTest = async () => {
        // Exit fullscreen before submitting
        exitFullscreen()

        try {
            // Calculate score
            const { correct, total } = calculateScore()
            const score = Math.round((correct / total) * 100)

            // Get question IDs (we'll need to fetch them or use indices for now)
            const questionIds = questions.map((_, index) => index) // Using indices as IDs for now

            // Save to database
            const response = await fetch('/api/tests/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.uid || 'anonymous'}` // Using Firebase UID
                },
                body: JSON.stringify({
                    exam: testConfig.name,
                    answers: Object.values(selectedAnswers), // Convert to array
                    score,
                    timeSpent: testConfig?.duration - timeLeft,
                    questions: questionIds
                })
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Test saved successfully:', result.testId)
            } else {
                console.error('Failed to save test result')
            }
        } catch (error) {
            console.error('Error saving test:', error)
        }

        // Store answers in localStorage as backup
        localStorage.setItem(`test-${testId}-answers`, JSON.stringify(selectedAnswers))
        // Redirect to results page
        router.push(`/test/${testId}/result`)
    }

    const resetTest = () => {
        setCurrentQuestion(0)
        setSelectedAnswers({})
        setTimeLeft(testConfig?.duration || 0)
        setIsActive(true)
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-300">Loading test...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error || !testConfig) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Test Not Found</h1>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                        The test you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        href="/tests"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Back to Tests
                    </Link>
                </div>
            </div>
        )
    }

    const currentQ = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/tests"
                                className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                Back
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{testConfig.name}</h1>
                                <p className="text-sm text-slate-600 dark:text-slate-300">Practice Test</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                <span className="font-mono text-lg font-semibold text-slate-900 dark:text-white">
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-slate-600 dark:text-slate-300">Question</div>
                                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                                    {currentQuestion + 1} / {questions.length}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2`}>
                            <motion.div
                                className={`bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]} h-2 rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={slideIn}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
                    >
                        {/* Question */}
                        <div className="mb-8">
                            <div className="flex items-start space-x-4">
                                <span className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]} text-white rounded-full flex items-center justify-center font-semibold text-sm`}>
                                    {currentQuestion + 1}
                                </span>
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                        {currentQ.question}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-300 text-lg">
                                        {currentQ.hindiQuestion}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="space-y-4 mb-8">
                            {currentQ.options.map((option: any) => {
                                const isSelected = selectedAnswers[currentQuestion] === option.optionId
                                return (
                                    <motion.button
                                        key={option.optionId}
                                        onClick={() => handleAnswerSelect(currentQuestion, option.optionId)}
                                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${isSelected
                                            ? `${testConfig.colors[2]} ${testConfig.colors[3]} dark:${testConfig.colors[4]}`
                                            : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${isSelected
                                                ? `${testConfig.colors[2]} bg-white text-black`
                                                : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'
                                                }`}>
                                                {String.fromCharCode(64 + option.optionId)}
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-slate-900 dark:text-white font-medium">
                                                    {option.text}
                                                </p>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                                                    {option.hindiText}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={prevQuestion}
                                disabled={currentQuestion === 0}
                                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${currentQuestion === 0
                                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Previous
                            </button>

                            <div className="flex space-x-3">
                                {currentQuestion === questions.length - 1 || isAllQuestionsAnswered() ? (
                                    <button
                                        onClick={handleSubmitAttempt}
                                        className="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Submit Test
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextQuestion}
                                        className={`flex items-center px-6 py-3 bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]} text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200`}
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Question Navigation */}
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600">
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Jump to question:</p>
                            <div className="flex flex-wrap gap-2">
                                {questions.map((_: any, index: number) => {
                                    const isCurrent = index === currentQuestion
                                    const isVisited = visitedQuestions.has(index)
                                    const isAnswered = selectedAnswers[index] !== undefined

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => goToQuestion(index)}
                                            className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${isCurrent
                                                ? 'bg-blue-500 text-white hover:bg-blue-600'  // Current question - blue
                                                : isVisited && isAnswered
                                                    ? 'bg-green-500 text-white hover:bg-green-600'  // Visited + answered - green
                                                    : isVisited
                                                        ? 'bg-red-500 text-white hover:bg-red-600'    // Visited + unanswered - red
                                                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'  // Unvisited - white
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Fullscreen Warning Modal */}
            <AnimatePresence>
                {fullscreenWarning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setFullscreenWarning(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    Fullscreen Required
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    You have exited fullscreen mode. Please return to fullscreen to continue the test, or submit your current answers.
                                </p>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={async () => {
                                            await enterFullscreen()
                                            setFullscreenWarning(false)
                                        }}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                                    >
                                        Return to Fullscreen
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFullscreenWarning(false)
                                            submitTest()
                                        }}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
                                    >
                                        Submit Test
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Confirmation Modal */}
            <AnimatePresence>
                {showSubmitConfirmation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={cancelSubmit}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    All Questions Completed!
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    You have answered all questions. Do you want to submit the test?
                                </p>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={confirmSubmit}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
                                    >
                                        Yes, Submit Test
                                    </button>
                                    <button
                                        onClick={cancelSubmit}
                                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
                                    >
                                        No, Review Again
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
