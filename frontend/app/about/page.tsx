'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Target, Users, Award, BookOpen, TrendingUp, Shield, Heart, Star, CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
}

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
}

const values = [
    {
        icon: Target,
        title: "Excellence",
        description: "We strive for excellence in everything we do, from question quality to user experience."
    },
    {
        icon: Shield,
        title: "Trust & Security",
        description: "Your data and privacy are our top priorities. We maintain the highest security standards."
    },
    {
        icon: Heart,
        title: "Student-Centric",
        description: "Every feature we build is designed with students' success and learning needs in mind."
    },
    {
        icon: TrendingUp,
        title: "Innovation",
        description: "We continuously innovate to provide cutting-edge AI-powered learning solutions."
    }
]

const stats = [
    { number: "500K+", label: "Students Served" },
    { number: "10M+", label: "Questions Answered" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" }
]

const team = [
    {
        name: "Dr. Sarah Chen",
        role: "Founder & CEO",
        expertise: "Education Technology",
        image: "SC"
    },
    {
        name: "Rahul Kumar",
        role: "CTO",
        expertise: "AI & Machine Learning",
        image: "RK"
    },
    {
        name: "Priya Sharma",
        role: "Head of Content",
        expertise: "Competitive Exams",
        image: "PS"
    }
]

export default function AboutPage() {
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
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >


                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
                        >
                            Empowering{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Future Leaders
                            </span>
                            <br />
                            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-700 dark:text-slate-300">
                                Through Intelligent Learning
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            ExamXpert was founded with a simple mission: to democratize quality education and make competitive exam preparation accessible to every aspiring student. We believe that with the right tools and guidance, anyone can achieve their dreams.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mb-12">
                            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 italic">
                                "Your Exam, Our Responsibility"
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4"
                        >
                            Our Story
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
                        >
                            From a small team of educators to a leading AI-powered learning platform
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 gap-12 items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                Born from a Vision
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                ExamXpert started as a vision to bridge the gap between traditional education and modern technology. Our founders, a team of experienced educators and technologists, recognized that competitive exam preparation needed a revolutionary approach.
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                What began as a small initiative to help local students has grown into a comprehensive platform serving hundreds of thousands of aspirants across India, helping them prepare for prestigious exams like UPSC, JEE, NEET, CAT, and more.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center text-green-600 dark:text-green-400">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    <span className="font-medium">10+ Years Experience</span>
                                </div>
                                <div className="flex items-center text-blue-600 dark:text-blue-400">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    <span className="font-medium">500K+ Students</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="border-0 shadow-xl bg-white dark:bg-slate-800">
                                <CardContent className="p-8">
                                    <div className="text-center mb-6">
                                        <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                            Our Mission
                                        </h4>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-center leading-relaxed">
                                        To empower every student with personalized, AI-driven learning experiences that maximize their potential and help them achieve their academic goals.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4"
                        >
                            Our Values
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-slate-600 dark:text-slate-300"
                        >
                            The principles that guide everything we do
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                            >
                                <Card className="h-full border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                                            <value.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                            {value.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl lg:text-4xl font-black text-white mb-4"
                        >
                            Our Impact
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-blue-100"
                        >
                            Numbers that tell our story of success
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="text-center"
                            >
                                <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-sm">
                                    <CardContent className="p-8">
                                        <div className="text-4xl lg:text-5xl font-black text-white mb-2">
                                            {stat.number}
                                        </div>
                                        <div className="text-blue-100 font-medium">
                                            {stat.label}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4"
                        >
                            Meet Our Team
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-slate-600 dark:text-slate-300"
                        >
                            The visionaries behind ExamXpert
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                            >
                                <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-8 text-center">
                                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-lg">
                                            {member.image}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                                            {member.role}
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                                            {member.expertise}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6"
                        >
                            Ready to Join Our Community?
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-slate-600 dark:text-slate-300 mb-8"
                        >
                            Start your journey towards success with ExamXpert today
                        </motion.p>
                        <motion.div variants={itemVariants}>
                            <Link href="/register">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                                    <BookOpen className="w-6 h-6 mr-3" />
                                    Start Learning Now
                                    <ArrowRight className="w-5 h-5 ml-3" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
