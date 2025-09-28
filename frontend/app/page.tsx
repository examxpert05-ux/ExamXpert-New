'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Rocket, Target, Users, Trophy, Zap, Sparkles, BookOpen, BarChart3, ChevronRight, Play, ArrowUpRight, Star, Award, TrendingUp, CheckCircle, Shield, Clock, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedCounter } from '@/components/animated-counter'

import { testConfigs } from './test-configs.js'

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

const features = [
    {
        icon: Brain,
        title: "AI-Powered Learning",
        description: "Adaptive algorithms that learn your strengths and weaknesses in real-time, providing personalized study recommendations.",
        gradient: "from-purple-500 via-pink-500 to-red-500",
        stats: "98% accuracy",
        benefits: ["Personalized Learning Paths", "Smart Question Selection", "Performance Prediction"]
    },
    {
        icon: Rocket,
        title: "Instant Results & Analytics",
        description: "Get detailed performance analysis, explanations, and insights within seconds of completing any test.",
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        stats: "< 5 seconds",
        benefits: ["Real-time Scoring", "Detailed Analytics", "Progress Tracking"]
    },
    {
        icon: Target,
        title: "Comprehensive Test Library",
        description: "Access thousands of practice questions across all major Indian competitive exams with difficulty adaptation.",
        gradient: "from-green-500 via-emerald-500 to-teal-500",
        stats: "10M+ questions",
        benefits: ["All Major Exams", "Difficulty Levels", "Previous Year Papers"]
    },
    {
        icon: TrendingUp,
        title: "Smart Performance Insights",
        description: "Advanced analytics with predictive modeling to forecast your exam success and identify improvement areas.",
        gradient: "from-orange-500 via-yellow-500 to-red-500",
        stats: "Real-time",
        benefits: ["Success Prediction", "Weakness Analysis", "Study Recommendations"]
    }
]

const stats = [
    {
        value: 500000,
        label: "Students Served",
        icon: Users,
        trend: "+18%",
        color: "from-purple-500 to-pink-500",
        suffix: "+"
    },
    {
        value: 10000000,
        label: "Questions Answered",
        icon: BookOpen,
        trend: "+23%",
        color: "from-blue-500 to-cyan-500",
        suffix: "+"
    },
    {
        value: 98,
        label: "Success Rate",
        icon: Trophy,
        trend: "+5%",
        color: "from-green-500 to-emerald-500",
        suffix: "%"
    },
    {
        value: 24,
        label: "AI Support",
        icon: Zap,
        trend: "Always",
        color: "from-orange-500 to-red-500",
        suffix: "/7"
    }
]

const testimonials = [
    {
        name: "Sarah Chen",
        role: "UPSC Topper 2024",
        content: "TestMaster AI transformed my preparation completely. The adaptive learning helped me focus on weak areas, and the predictive analytics gave me the confidence I needed.",
        avatar: "SC",
        rating: 5,
        exam: "UPSC CSE",
        improvement: "+45 marks"
    },
    {
        name: "Rahul Kumar",
        role: "CAT 99.8%ile",
        content: "The personalized analytics gave me insights I never had before. The AI recommendations were spot-on and helped me achieve my target percentile.",
        avatar: "RK",
        rating: 5,
        exam: "CAT",
        improvement: "+2.3 percentile"
    },
    {
        name: "Priya Sharma",
        role: "NEET AIR 45",
        content: "Real-time feedback and instant explanations made all the difference. The platform's AI understood my learning pattern perfectly.",
        avatar: "PS",
        rating: 5,
        exam: "NEET",
        improvement: "+120 marks"
    }
]

// Available tests for MVP
const availableTests = [
    { code: 't1', name: 'UPSC', fullName: 'Union Public Service Commission', icon: '🏛️', duration: '10 min', questions: '20 Qs' },
    { code: 't2', name: 'JEE', fullName: 'Joint Entrance Examination', icon: '🎓', duration: '10 min', questions: '20 Qs' },
    { code: 't3', name: 'NEET', fullName: 'National Eligibility cum Entrance Test', icon: '⚕️', duration: '10 min', questions: '20 Qs' },
    { code: 't4', name: 'CAT', fullName: 'Common Admission Test', icon: '💼', duration: '10 min', questions: '20 Qs' },
    { code: 't5', name: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', icon: '🔧', duration: '10 min', questions: '20 Qs' },
    { code: 't6', name: 'SSC', fullName: 'Staff Selection Commission', icon: '📊', duration: '10 min', questions: '20 Qs' },
    { code: 't7', name: 'BANKING', fullName: 'Banking Exams', icon: '🏦', duration: '10 min', questions: '20 Qs' },
    { code: 't8', name: 'CLAT', fullName: 'Common Law Admission Test', icon: '⚖️', duration: '10 min', questions: '20 Qs' },
    { code: 't9', name: 'NDA', fullName: 'National Defence Academy', icon: '🎯', duration: '10 min', questions: '20 Qs' },
    { code: 't10', name: 'UGC NET', fullName: 'University Grants Commission National Eligibility Test', icon: '📚', duration: '10 min', questions: '20 Qs' }
]

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        className="text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Trust Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 shadow-lg mb-8"
                        >
                            <Award className="w-5 h-5 text-yellow-500 mr-2" />
                            <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                                🏆 Trusted by 500K+ Students Worldwide
                            </span>
                            <div className="flex ml-3 space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
                        >
                            Master Your{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Competitive Exams
                            </span>
                            <br />
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300">
                                with ExamXpert
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            Experience the future of competitive exam preparation with our AI-powered platform.
                            Get personalized learning paths, instant feedback, and predictive analytics that guarantee your success.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                        >
                            <Link href="/test/trial">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
                                    aria-label="Start your free trial of TestMaster AI"
                                >
                                    <Rocket className="w-6 h-6 mr-3" aria-hidden="true" />
                                    Start Free Trial
                                    <ArrowUpRight className="w-5 h-5 ml-3" aria-hidden="true" />
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-slate-300 dark:border-slate-600 hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
                                aria-label="Watch demonstration video of TestMaster AI"
                            >
                                <Play className="w-6 h-6 mr-3" aria-hidden="true" />
                                Watch Demo
                                <ChevronRight className="w-5 h-5 ml-3" aria-hidden="true" />
                            </Button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-slate-600 dark:text-slate-400"
                        >
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                No Credit Card Required
                            </div>
                            <div className="flex items-center">
                                <Shield className="w-4 h-4 text-blue-500 mr-2" />
                                100% Secure & Private
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 text-purple-500 mr-2" />
                                24/7 AI Support
                            </div>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group"
                                >
                                    <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:bg-white dark:hover:bg-slate-800">
                                        <CardContent className="p-6 text-center">
                                            <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <stat.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-2">
                                                <AnimatedCounter
                                                    value={stat.value}
                                                    suffix={stat.suffix}
                                                    duration={2.5}
                                                />
                                            </div>
                                            <div className="text-slate-600 dark:text-slate-400 font-medium mb-2">
                                                {stat.label}
                                            </div>
                                            <Badge variant="secondary" className="text-xs">
                                                {stat.trend}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Exam Categories */}
            <section id="tests" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4"
                        >
                            All Major Competitive Exams
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-slate-600 dark:text-slate-300"
                        >
                            Comprehensive preparation for India's most prestigious examinations
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-5 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {availableTests.map((test, index) => {
                            const testConfig = testConfigs[test.code as keyof typeof testConfigs]
                            return (
                                <Link key={test.code} href={`/test/${test.code}`}>
                                    <motion.div
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        className="group cursor-pointer"
                                    >
                                        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 h-full">
                                            <CardContent className="p-4 text-center h-full">
                                                <div className="flex flex-col justify-between min-h-[140px] h-full">
                                                    <div>
                                                        <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${testConfig.colors[0]} ${testConfig.colors[1]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                            <span className="text-xl">{test.icon}</span>
                                                        </div>
                                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">
                                                            {test.name}
                                                        </h3>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-tight min-h-[2.5rem] flex items-center justify-center">
                                                            {test.fullName}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                                        Practice Test
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Link>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
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
                            className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6"
                        >
                            Why Choose{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ExamXpert
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
                        >
                            Cutting-edge AI technology meets proven educational methods for unparalleled exam preparation
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <Card className="h-full border-0 shadow-xl bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                    <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
                                    <CardContent className="p-8">
                                        <div className={`w-16 h-16 mb-6 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        {/* Benefits */}
                                        <div className="space-y-2 mb-6">
                                            {feature.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                                    {benefit}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                {feature.stats}
                                            </Badge>
                                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
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
                            Success Stories That Inspire
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-slate-600 dark:text-slate-300"
                        >
                            Real students, real results, real success
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <Card className="border-0 shadow-xl bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-500 h-full">
                                    <CardContent className="p-8">
                                        <div className="flex mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 mb-6 italic text-lg leading-relaxed">
                                            "{testimonial.content}"
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <Badge variant="outline" className="text-xs">
                                                {testimonial.exam}
                                            </Badge>
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                                                {testimonial.improvement}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">
                                                    {testimonial.name}
                                                </div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                                    {testimonial.role}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                        </motion.div>
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl lg:text-5xl font-black text-white mb-6"
                        >
                            Ready to Transform Your Learning Journey?
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
                        >
                            Join thousands of successful students who have achieved their dreams with ExamXpert.
                            Start your personalized learning path today.
                        </motion.p>
                        <motion.div variants={itemVariants}>
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-10 py-4"
                                aria-label="Start your success journey with TestMaster AI"
                            >
                                <Zap className="w-6 h-6 mr-3" aria-hidden="true" />
                                Start Your Success Journey
                                <ArrowUpRight className="w-5 h-5 ml-3" aria-hidden="true" />
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 text-blue-100 text-sm"
                        >
                            ✨ No credit card required • 7-day free trial • Cancel anytime
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                                    <span className="text-2xl font-black text-white">E</span>
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    ExamXpert
                                </span>
                            </div>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                The future of competitive exam preparation powered by artificial intelligence and data-driven insights.
                            </p>
                            <div className="flex space-x-4">
                                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                                    <span className="text-sm font-bold">in</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-6">Platform</h3>
                            <ul className="space-y-3 text-slate-400">
                                <li><Link href="/tests" className="hover:text-blue-400 transition-colors flex items-center">
                                    <ChevronRight className="w-3 h-3 mr-2" />
                                    Practice Tests
                                </Link></li>
                                <li><Link href="/blog" className="hover:text-blue-400 transition-colors flex items-center">
                                    <ChevronRight className="w-3 h-3 mr-2" />
                                    Study Resources
                                </Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-6">Support</h3>
                            <ul className="space-y-3 text-slate-400">
                                <li><Link href="/help" className="hover:text-blue-400 transition-colors flex items-center">
                                    <ChevronRight className="w-3 h-3 mr-2" />
                                    Help Center
                                </Link></li>
                                <li><Link href="/contact" className="hover:text-blue-400 transition-colors flex items-center">
                                    <ChevronRight className="w-3 h-3 mr-2" />
                                    Contact Us
                                </Link></li>
                                <li><Link href="/faq" className="hover:text-blue-400 transition-colors flex items-center">
                                    <ChevronRight className="w-3 h-3 mr-2" />
                                    FAQ
                                </Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-6">Legal</h3>
                            <ul className="space-y-3 text-slate-400">
                                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors flex items-center">
                                    <ChevronRight className="w-3 h-3 mr-2" />
                                    Privacy Policy
                                </Link></li>
                                <li><Link href="/terms" className="hover:text-blue-400 transition-colors flex items-center">
                                    <ChevronRight className="w-3 h-3 mr-2" />
                                    Terms of Service
                                </Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center">
                        <p className="text-slate-400">&copy; 2025 ExamXpert. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
