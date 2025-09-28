'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

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

export default function TrialTestPage() {
    const router = useRouter()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
    const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmit()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleAnswerSelect = (questionId: number, optionId: number) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }))
    }

    const handleNext = () => {
        if (currentQuestion < trialQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1)
        }
    }

    const handleSubmit = () => {
        setIsSubmitted(true)
        // Store trial answers in sessionStorage (not localStorage) so they don't persist
        sessionStorage.setItem('trial-answers', JSON.stringify(selectedAnswers))
        router.push('/test/trial/result')
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-300">Submitting your trial test...</p>
                </div>
            </div>
        )
    }

    const question = trialQuestions[currentQuestion]
    const selectedAnswer = selectedAnswers[question.questionId]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <Home className="w-5 h-5 mr-2" />
                                Home
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Free Trial Test</h1>
                                <p className="text-sm text-slate-600 dark:text-slate-300">Question {currentQuestion + 1} of {trialQuestions.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-slate-600 dark:text-slate-300">
                                <Clock className="w-5 h-5 mr-2" />
                                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / trialQuestions.length) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mt-2">
                            <span>Progress</span>
                            <span>{currentQuestion + 1} / {trialQuestions.length}</span>
                        </div>
                    </div>

                    {/* Question Card */}
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8"
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                                {question.question}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300">
                                {question.hindiQuestion}
                            </p>
                        </div>

                        {/* Options */}
                        <div className="space-y-4">
                            {question.options.map((option) => (
                                <button
                                    key={option.optionId}
                                    onClick={() => handleAnswerSelect(question.questionId, option.optionId)}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${selectedAnswer === option.optionId
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                                        }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${selectedAnswer === option.optionId
                                                ? 'bg-blue-500 border-blue-500 text-white'
                                                : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'
                                            }`}>
                                            {String.fromCharCode(64 + option.optionId)}
                                        </span>
                                        <div className="flex-1">
                                            <p className={`font-medium ${selectedAnswer === option.optionId
                                                    ? 'text-blue-900 dark:text-blue-200'
                                                    : 'text-slate-900 dark:text-white'
                                                }`}>
                                                {option.text}
                                            </p>
                                            <p className={`text-sm mt-1 ${selectedAnswer === option.optionId
                                                    ? 'text-blue-700 dark:text-blue-300'
                                                    : 'text-slate-600 dark:text-slate-300'
                                                }`}>
                                                {option.hindiText}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <Button
                            onClick={handlePrev}
                            disabled={currentQuestion === 0}
                            variant="outline"
                            className="px-6 py-3"
                        >
                            Previous
                        </Button>

                        <div className="flex space-x-2">
                            {trialQuestions.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 rounded-full ${index === currentQuestion
                                            ? 'bg-blue-500'
                                            : index < currentQuestion
                                                ? 'bg-green-500'
                                                : 'bg-slate-300 dark:bg-slate-600'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentQuestion === trialQuestions.length - 1 ? (
                            <Button
                                onClick={handleSubmit}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3"
                            >
                                Submit Trial
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                disabled={!selectedAnswer}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3"
                            >
                                Next
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
