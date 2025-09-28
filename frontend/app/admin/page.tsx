'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, BookOpen, BarChart3, Settings, Shield, Database, FileText, TrendingUp, Activity, AlertTriangle } from 'lucide-react'

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

const adminStats = [
    {
        title: "Total Users",
        value: "12,847",
        change: "+12.5%",
        changeType: "positive",
        icon: Users,
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Active Tests",
        value: "3,429",
        change: "+8.2%",
        changeType: "positive",
        icon: BookOpen,
        color: "from-green-500 to-emerald-500"
    },
    {
        title: "Questions",
        value: "45,231",
        change: "+15.3%",
        changeType: "positive",
        icon: FileText,
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Server Uptime",
        value: "99.9%",
        change: "+0.1%",
        changeType: "positive",
        icon: Activity,
        color: "from-orange-500 to-red-500"
    }
]

const quickActions = [
    {
        title: "Add New Question",
        description: "Create and manage test questions",
        icon: BookOpen,
        href: "/admin/questions/new",
        color: "bg-blue-500 hover:bg-blue-600"
    },
    {
        title: "User Management",
        description: "Manage user accounts and permissions",
        icon: Users,
        href: "/admin/users",
        color: "bg-green-500 hover:bg-green-600"
    },
    {
        title: "Analytics Dashboard",
        description: "View detailed performance metrics",
        icon: BarChart3,
        href: "/admin/analytics",
        color: "bg-purple-500 hover:bg-purple-600"
    },
    {
        title: "System Settings",
        description: "Configure application settings",
        icon: Settings,
        href: "/admin/settings",
        color: "bg-orange-500 hover:bg-orange-600"
    }
]

const recentActivities = [
    {
        action: "New user registered",
        user: "Rahul Sharma",
        time: "2 minutes ago",
        type: "user"
    },
    {
        action: "Question bank updated",
        user: "Admin",
        time: "15 minutes ago",
        type: "content"
    },
    {
        action: "Test completed",
        user: "Priya Patel",
        time: "1 hour ago",
        type: "test"
    },
    {
        action: "System backup completed",
        user: "System",
        time: "3 hours ago",
        type: "system"
    },
    {
        action: "New questions added",
        user: "Dr. Kumar",
        time: "5 hours ago",
        type: "content"
    }
]

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="flex items-center space-x-4 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">Manage your testing platform</p>
                        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mt-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>All systems operational</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                >
                    {adminStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{stat.title}</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
                                    <p className={`text-sm mt-2 ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {stat.change} from last month
                                    </p>
                                </div>
                                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <motion.div
                        className="lg:col-span-2"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.div variants={fadeInUp} className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {quickActions.map((action, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        className="group"
                                    >
                                        <Link href={action.href}>
                                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6">
                                                <div className="flex items-start space-x-4">
                                                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                        <action.icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            {action.title}
                                                        </h3>
                                                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                                                            {action.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* System Health */}
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">System Health</h2>
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Database className="w-8 h-8 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Database</h3>
                                        <p className="text-green-600 dark:text-green-400 text-sm">Healthy</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">API Response</h3>
                                        <p className="text-blue-600 dark:text-blue-400 text-sm">Fast</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Alerts</h3>
                                        <p className="text-yellow-600 dark:text-yellow-400 text-sm">2 Minor</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                                <div className="space-y-4">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-start space-x-3 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:pb-0">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-900' :
                                                activity.type === 'content' ? 'bg-green-100 dark:bg-green-900' :
                                                    activity.type === 'test' ? 'bg-purple-100 dark:bg-purple-900' :
                                                        'bg-gray-100 dark:bg-gray-900'
                                                }`}>
                                                {activity.type === 'user' && <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                                                {activity.type === 'content' && <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />}
                                                {activity.type === 'test' && <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                                                {activity.type === 'system' && <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-slate-900 dark:text-white font-medium">
                                                    {activity.action}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    by {activity.user} • {activity.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <Link
                                        href="/admin/activity"
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                                    >
                                        View all activity →
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Quick Stats */}
                <motion.div
                    className="mt-8"
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                >
                    <motion.div variants={fadeInUp}>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Today's Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                                <h3 className="text-lg font-semibold mb-2">New Registrations</h3>
                                <p className="text-3xl font-bold">247</p>
                                <p className="text-blue-100 text-sm mt-2">+18% from yesterday</p>
                            </div>
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
                                <h3 className="text-lg font-semibold mb-2">Tests Completed</h3>
                                <p className="text-3xl font-bold">1,429</p>
                                <p className="text-green-100 text-sm mt-2">+12% from yesterday</p>
                            </div>
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                                <h3 className="text-lg font-semibold mb-2">Questions Added</h3>
                                <p className="text-3xl font-bold">89</p>
                                <p className="text-purple-100 text-sm mt-2">+25% from yesterday</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
