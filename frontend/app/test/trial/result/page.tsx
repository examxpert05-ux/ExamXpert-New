'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, Clock, CheckCircle, XCircle, ArrowRight, Home, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const trialQuestions = [
    {
        questionId: 1,
        question: "What is the capital of India?",
        hindiQuestion: "भारत की राजधानी क्या है?",
        options: [
            { optionId: 1, text: "Mumbai", hindiText: "मुंबई" },
            { optionId: 2, text: "New Delhi", hindiText: "नई दिल्ली" },
            { optionId: 3, text: "Kolkata", hindiText: "कोलकाता" },
            { optionId: 4, text: "Chennai", hindiText: "चेन्नई" }
        ],
        answerId: 2
    },
    {
        questionId: 2,
        question: "Which planet is known as the Red Planet?",
        hindiQuestion: "किस ग्रह को लाल ग्रह के रूप में जाना जाता है?",
        options: [
            { optionId: 1, text: "Venus", hindiText: "शुक्र" },
            { optionId: 2, text: "Mars", hindiText: "मंगल" },
            { optionId: 3, text: "Jupiter", hindiText: "बृहस्पति" },
            { optionId: 4, text: "Saturn", hindiText: "शनि" }
        ],
        answerId: 2
    },
    {
        questionId: 3,
        question: "What is 2 + 2?",
        hindiQuestion: "2 + 2 क्या है?",
        options: [
            { optionId: 1, text: "3", hindiText: "3" },
            { optionId: 2, text: "4", hindiText: "4" },
            { optionId: 3, text: "5", hindiText: "5" },
            { optionId: 4, text: "6", hindiText: "6" }
        ],
        answerId: 2
    },
    {
        questionId: 4,
        question: "Which is the largest ocean on Earth?",
        hindiQuestion: "पृथ्वी पर सबसे बड़ा महासागर कौन सा है?",
        options: [
            { optionId: 1, text: "Atlantic Ocean", hindiText: "अटलांटिक महासागर" },
            { optionId: 2, text: "Indian Ocean", hindiText: "हिंद महासागर" },
            { optionId: 3, text: "Pacific Ocean", hindiText: "प्रशांत महासागर" },
            { optionId: 4, text: "Arctic Ocean", hindiText: "आर्कटिक महासागर" }
        ],
        answerId: 3
    },
    {
        questionId: 5,
        question: "What is the color of the sky on a clear day?",
        hindiQuestion: "साफ दिन में आकाश का रंग क्या होता है?",
        options: [
            { optionId: 1, text: "Green", hindiText: "हरा" },
            { optionId: 2, text: "Blue", hindiText: "नीला" },
            { optionId: 3, text: "Red", hindiText: "लाल" },
            { optionId: 4, text: "Yellow", hindiText: "पीला" }
        ],
        answerId: 2
    }
]

export default function TrialResultPage() {
    const router = useRouter()
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Load trial answers from sessionStorage
        const storedAnswers = sessionStorage.getItem('trial-answers')
        if (storedAnswers) {
            setSelectedAnswers(JSON.parse(storedAnswers))
        }
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-300">Loading your trial results...</p>
                </div>
            </div>
        )
    }

    // Calculate results
    const totalQuestions = trialQuestions.length
    const attemptedQuestions = Object.keys(selectedAnswers).length
    const correctAnswers = trialQuestions.filter(q => selectedAnswers[q.questionId] === q.answerId).length
    const incorrectAnswers = attemptedQuestions - correctAnswers
    const unattemptedQuestions = totalQuestions - attemptedQuestions
    const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

    const handleRetakeTrial = () => {
        // Clear trial data
        sessionStorage.removeItem('trial-answers')
        router.push('/test/trial')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Home
                        </Link>
                        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Trial Test Results</h1>
                        <div></div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Score Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-center mb-4">
                                    <Trophy className="w-16 h-16 text-yellow-300" />
                                </div>
                                <h2 className="text-3xl font-bold mb-2">Trial Complete!</h2>
                                <p className="text-blue-100 mb-6">Here's how you performed on your free trial</p>

                                <div className="text-6xl font-black mb-4">
                                    {scorePercentage}%
                                </div>
                                <p className="text-xl text-blue-100">
                                    {correctAnswers} out of {totalQuestions} correct
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                    >
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6 text-center">
                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{correctAnswers}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Correct</div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6 text-center">
                                <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{incorrectAnswers}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Incorrect</div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6 text-center">
                                <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{attemptedQuestions}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Attempted</div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6 text-center">
                                <Clock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{unattemptedQuestions}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Unattempted</div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Performance Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mb-8"
                    >
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                                    {scorePercentage >= 80 ? "Excellent Performance! 🎉" :
                                        scorePercentage >= 60 ? "Good Job! 👍" :
                                            scorePercentage >= 40 ? "Keep Practicing! 💪" :
                                                "Don't Worry, Keep Learning! 📚"}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300">
                                    {scorePercentage >= 80 ? "You're ready for the real challenges! Try our full tests to unlock your potential." :
                                        scorePercentage >= 60 ? "You're on the right track! Practice more to improve your score." :
                                            scorePercentage >= 40 ? "Every expert was once a beginner. Keep studying and you'll see improvement." :
                                                "Learning is a journey. Take our full courses to build strong fundamentals."}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/test/trial/response">
                            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3">
                                View Detailed Responses
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>

                        <Button
                            onClick={handleRetakeTrial}
                            variant="outline"
                            className="px-8 py-3"
                        >
                            <RotateCcw className="w-5 h-5 mr-2" />
                            Retake Trial
                        </Button>

                        <Link href="/">
                            <Button variant="outline" className="px-8 py-3">
                                <Home className="w-5 h-5 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trial Notice */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center mt-8"
                    >
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            This was a free trial test. Your responses are not saved.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
