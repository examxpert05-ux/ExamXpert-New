'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, ArrowRight, Clock, Users, Target, Award, TrendingUp, Shield, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { testConfigs } from '../test-configs.js'

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

// Test categories with full names
const examGroups = {
    'NEET': ['t3'],
    'IIT JEE': ['t2'],
    'UPSC': ['t1'],
    'CAT': ['t4'],
    'GATE': ['t5'],
    'SSC': ['t6'],
    'BANKING': ['t7', 't11', 't12', 't13'],
    'CLAT': ['t8'],
    'NDA': ['t9'],
    'UGC NET': ['t10']
}

export default function TestsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        className="text-center"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.div variants={fadeInUp} className="mb-8">
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Practice Tests
                                <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
                        >
                            Choose Your{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Exam Path
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            Select from our comprehensive collection of practice tests designed for India's most prestigious competitive examinations.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 mb-12">
                            <div className="flex items-center text-green-600 dark:text-green-400">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                <span className="font-medium">20 Questions Each</span>
                            </div>
                            <div className="flex items-center text-blue-600 dark:text-blue-400">
                                <Clock className="w-5 h-5 mr-2" />
                                <span className="font-medium">10 Minutes Duration</span>
                            </div>
                            <div className="flex items-center text-purple-600 dark:text-purple-400">
                                <Target className="w-5 h-5 mr-2" />
                                <span className="font-medium">Instant Results</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Tests Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        {Object.entries(examGroups).map(([category, testCodes]) =>
                            testCodes.map((testCode, testIndex) => {
                                const testConfig = testConfigs[testCode as keyof typeof testConfigs]
                                const isFirstInCategory = testIndex === 0

                                return (
                                    <motion.div
                                        key={`${category}-${testCode}`}
                                        variants={fadeInUp}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="group"
                                    >
                                        <Link href={`/test/${testCode}`}>
                                            <Card className="h-full border-0 shadow-xl bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                                <div className={`h-2 bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]}`}></div>
                                                <CardContent className="p-8">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className={`w-14 h-14 bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                            <BookOpen className="w-7 h-7 text-white" />
                                                        </div>
                                                        <Badge variant="outline" className="text-xs">
                                                            {isFirstInCategory ? category : `${category} ${testIndex + 1}`}
                                                        </Badge>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {testConfig.name}
                                                    </h3>

                                                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                                                        {testConfig.description}
                                                    </p>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                            <Clock className="w-4 h-4 mr-1" />
                                                            10 min
                                                        </div>
                                                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                            <Target className="w-4 h-4 mr-1" />
                                                            20 Qs
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                                        <span className="font-semibold text-sm">Start Practice</span>
                                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                )
                            })
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl lg:text-4xl font-black text-white mb-4"
                        >
                            Why Practice With Us?
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-blue-100"
                        >
                            Experience the difference with our advanced testing platform
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Real-time Analytics</h3>
                            <p className="text-blue-100">Get instant performance insights and detailed analysis after each test</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Quality Questions</h3>
                            <p className="text-blue-100">Curated questions that match the difficulty and pattern of actual exams</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Performance Tracking</h3>
                            <p className="text-blue-100">Monitor your progress and identify areas for improvement</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
