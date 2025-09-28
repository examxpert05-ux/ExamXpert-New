'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, ArrowRight, Clock, Target, Microscope, Atom, Dna, Beaker } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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

// NEET Subject Tests
const neetSubjects = [
    {
        id: 'biology',
        name: 'Biology',
        description: 'Master the fundamentals of life sciences with comprehensive practice questions covering botany and zoology.',
        icon: Dna,
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-500',
        questions: 20,
        duration: 10
    },
    {
        id: 'physics',
        name: 'Physics',
        description: 'Sharpen your understanding of physical principles with questions covering mechanics, optics, and modern physics.',
        icon: Atom,
        color: 'from-blue-500 to-cyan-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-500',
        questions: 20,
        duration: 10
    },
    {
        id: 'chemistry',
        name: 'Chemistry',
        description: 'Excel in chemical reactions and concepts with practice questions covering organic, inorganic, and physical chemistry.',
        icon: Beaker,
        color: 'from-purple-500 to-pink-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        borderColor: 'border-purple-500',
        questions: 20,
        duration: 10
    }
]

export default function NEETPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
            {/* Header */}
            <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="flex items-center mb-8"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.div variants={fadeInUp}>
                            <Link
                                href="/tests"
                                className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Tests
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.div variants={fadeInUp} className="mb-6">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2">
                                NEET Preparation
                            </Badge>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
                        >
                            NEET{' '}
                            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Subjects
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            Choose your subject to practice with targeted questions designed specifically for NEET preparation.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 mb-12">
                            <div className="flex items-center text-green-600 dark:text-green-400">
                                <Microscope className="w-5 h-5 mr-2" />
                                <span className="font-medium">Subject-wise Practice</span>
                            </div>
                            <div className="flex items-center text-blue-600 dark:text-blue-400">
                                <Clock className="w-5 h-5 mr-2" />
                                <span className="font-medium">10 Minutes Each</span>
                            </div>
                            <div className="flex items-center text-purple-600 dark:text-purple-400">
                                <Target className="w-5 h-5 mr-2" />
                                <span className="font-medium">NEET Focused</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Subjects Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        {neetSubjects.map((subject, index) => {
                            const IconComponent = subject.icon

                            return (
                                <motion.div
                                    key={subject.id}
                                    variants={fadeInUp}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group"
                                >
                                    <Card className="h-full border-0 shadow-xl bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                        <div className={`h-2 bg-gradient-to-r ${subject.color}`}></div>
                                        <CardContent className="p-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <Badge variant="outline" className="text-xs">
                                                    NEET
                                                </Badge>
                                            </div>

                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                                {subject.name}
                                            </h3>

                                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                                                {subject.description}
                                            </p>

                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {subject.duration} min
                                                </div>
                                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                    <Target className="w-4 h-4 mr-1" />
                                                    {subject.questions} Qs
                                                </div>
                                            </div>

                                            <Button
                                                asChild
                                                className={`w-full bg-gradient-to-r ${subject.color} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center`}
                                            >
                                                <Link href={`/test/t${index + 1}`}>
                                                    <BookOpen className="w-5 h-5 mr-2" />
                                                    Start {subject.name} Test
                                                    <ArrowRight className="w-5 h-5 ml-2" />
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl lg:text-4xl font-black text-white mb-4"
                        >
                            NEET Preparation Tips
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-green-100 mb-12"
                        >
                            Maximize your score with our expert guidance
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
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Subject Focus</h3>
                            <p className="text-green-100">Practice each subject individually to identify your strengths and weaknesses</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Time Management</h3>
                            <p className="text-green-100">Learn to manage your time effectively with our timed practice sessions</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Microscope className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Concept Clarity</h3>
                            <p className="text-green-100">Build strong conceptual understanding with our detailed explanations</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
