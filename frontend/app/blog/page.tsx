'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Search, Tag, BookOpen } from 'lucide-react'

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

const blogPosts = [
    {
        id: 1,
        title: "UPSC Prelims 2025: Complete Strategy Guide",
        excerpt: "Master the UPSC Prelims with our comprehensive strategy covering syllabus breakdown, study plan, and preparation tips.",
        author: "Dr. Rajesh Kumar",
        date: "2025-01-15",
        readTime: "8 min read",
        category: "UPSC",
        image: "🏛️",
        featured: true
    },
    {
        id: 2,
        title: "JEE Advanced Mathematics: Topic-wise Preparation",
        excerpt: "Detailed analysis of JEE Advanced mathematics syllabus with topic-wise weightage and preparation strategies.",
        author: "Prof. Anita Sharma",
        date: "2025-01-12",
        readTime: "12 min read",
        category: "JEE",
        image: "📐",
        featured: true
    },
    {
        id: 3,
        title: "NEET Biology: Last Minute Revision Tips",
        excerpt: "Essential revision strategies and important topics for NEET Biology that you shouldn't miss.",
        author: "Dr. Priya Singh",
        date: "2025-01-10",
        readTime: "6 min read",
        category: "NEET",
        image: "🧬",
        featured: false
    },
    {
        id: 4,
        title: "CAT 2025: Quantitative Aptitude Preparation Guide",
        excerpt: "Complete guide to mastering Quantitative Aptitude for CAT with practice strategies and time management tips.",
        author: "Rahul Mehta",
        date: "2025-01-08",
        readTime: "10 min read",
        category: "CAT",
        image: "📊",
        featured: false
    },
    {
        id: 5,
        title: "SSC CGL 2025: General Awareness Preparation",
        excerpt: "Comprehensive coverage of General Awareness topics for SSC CGL with current affairs and static GK.",
        author: "Sanjay Gupta",
        date: "2025-01-05",
        readTime: "15 min read",
        category: "SSC",
        image: "📰",
        featured: false
    },
    {
        id: 6,
        title: "GATE 2025: Computer Science Study Plan",
        excerpt: "6-month study plan for GATE Computer Science with topic-wise breakdown and resource recommendations.",
        author: "Dr. Amit Patel",
        date: "2025-01-03",
        readTime: "14 min read",
        category: "GATE",
        image: "💻",
        featured: false
    }
]

const categories = [
    { name: "UPSC", count: 25, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    { name: "JEE", count: 18, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
    { name: "NEET", count: 22, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    { name: "CAT", count: 15, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
    { name: "SSC", count: 20, color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200" },
    { name: "GATE", count: 16, color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" }
]

export default function BlogPage() {
    const featuredPosts = blogPosts.filter(post => post.featured)
    const regularPosts = blogPosts.filter(post => !post.featured)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Study Resources</h1>
                            <p className="text-slate-600 dark:text-slate-300 mt-2">Expert tips, strategies, and study guides for competitive exams</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Featured Posts */}
                        <motion.div
                            className="mb-12"
                            initial="initial"
                            animate="animate"
                            variants={stagger}
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Featured Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {featuredPosts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        variants={fadeInUp}
                                        className="group"
                                    >
                                        <Link href={`/blog/${post.id}`}>
                                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                                    <span className="text-6xl">{post.image}</span>
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                                                        <span className="flex items-center">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {new Date(post.date).toLocaleDateString()}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Clock className="w-4 h-4 mr-1" />
                                                            {post.readTime}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                            <User className="w-4 h-4 mr-1" />
                                                            {post.author}
                                                        </span>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.category === 'UPSC' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                            post.category === 'JEE' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                                                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Regular Posts */}
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={stagger}
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Latest Articles</h2>
                            <div className="space-y-6">
                                {regularPosts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        variants={fadeInUp}
                                        className="group"
                                    >
                                        <Link href={`/blog/${post.id}`}>
                                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6">
                                                <div className="flex items-start space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                            <span className="text-2xl">{post.image}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mb-2">
                                                            <span className="flex items-center">
                                                                <Calendar className="w-4 h-4 mr-1" />
                                                                {new Date(post.date).toLocaleDateString()}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Clock className="w-4 h-4 mr-1" />
                                                                {post.readTime}
                                                            </span>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.category === 'NEET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                                post.category === 'CAT' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                                                                    post.category === 'SSC' ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' :
                                                                        'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'}`}>
                                                                {post.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
                                                            {post.excerpt}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <span className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                                                <User className="w-4 h-4 mr-1" />
                                                                {post.author}
                                                            </span>
                                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Categories */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                                <Tag className="w-5 h-5 mr-2" />
                                Categories
                            </h3>
                            <div className="space-y-3">
                                {categories.map((category, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-slate-700 dark:text-slate-300">{category.name}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                                            {category.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Popular Topics</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Strategy', 'Tips', 'Study Plan', 'Revision', 'Mock Tests', 'Current Affairs', 'Syllabus', 'Preparation'].map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 transition-colors cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                            <BookOpen className="w-8 h-8 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                            <p className="text-blue-100 text-sm mb-4">
                                Get the latest study tips and exam strategies delivered to your inbox.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
