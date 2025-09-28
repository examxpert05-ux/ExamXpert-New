// Test configurations mapping test codes to exam details
// MVP Version: 10 tests, 20 questions each, 10 minutes duration
export const testConfigs = {
    't1': {
        name: 'UPSC',
        exam: 'upsc',
        duration: 10 * 60, // 10 minutes
        colors: ['from-blue-500', 'to-purple-600', 'border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20'],
        description: 'Union Public Service Commission',
        apiUrl: 'http://localhost:5000/api/questions/upsc'
    },
    't2': {
        name: 'JEE',
        exam: 'jee',
        duration: 10 * 60, // 10 minutes
        colors: ['from-purple-500', 'to-pink-600', 'border-purple-500', 'bg-purple-50', 'dark:bg-purple-900/20'],
        description: 'Joint Entrance Examination',
        apiUrl: 'http://localhost:5000/api/questions/jee'
    },
    't3': {
        name: 'NEET',
        exam: 'neet',
        duration: 10 * 60, // 10 minutes
        colors: ['from-green-500', 'to-teal-600', 'border-green-500', 'bg-green-50', 'dark:bg-green-900/20'],
        description: 'National Eligibility cum Entrance Test',
        apiUrl: 'http://localhost:5000/api/questions/neet'
    },
    't4': {
        name: 'CAT',
        exam: 'cat',
        duration: 10 * 60, // 10 minutes
        colors: ['from-orange-500', 'to-red-600', 'border-orange-500', 'bg-orange-50', 'dark:bg-orange-900/20'],
        description: 'Common Admission Test',
        apiUrl: 'http://localhost:5000/api/questions/cat'
    },
    't5': {
        name: 'GATE',
        exam: 'gate',
        duration: 10 * 60, // 10 minutes
        colors: ['from-cyan-500', 'to-blue-600', 'border-cyan-500', 'bg-cyan-50', 'dark:bg-cyan-900/20'],
        description: 'Graduate Aptitude Test in Engineering',
        apiUrl: 'http://localhost:5000/api/questions/gate'
    },
    't6': {
        name: 'SSC',
        exam: 'ssc',
        duration: 10 * 60, // 10 minutes
        colors: ['from-emerald-500', 'to-green-600', 'border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-900/20'],
        description: 'Staff Selection Commission',
        apiUrl: 'http://localhost:5000/api/questions/ssc'
    },
    't7': {
        name: 'BANKING',
        exam: 'banking',
        duration: 10 * 60, // 10 minutes
        colors: ['from-yellow-500', 'to-orange-600', 'border-yellow-500', 'bg-yellow-50', 'dark:bg-yellow-900/20'],
        description: 'Banking Exams',
        apiUrl: 'http://localhost:5000/api/questions/banking'
    },
    't11': {
        name: 'IBPS',
        exam: 'ibps',
        duration: 10 * 60, // 10 minutes
        colors: ['from-amber-500', 'to-yellow-600', 'border-amber-500', 'bg-amber-50', 'dark:bg-amber-900/20'],
        description: 'Institute of Banking Personnel Selection',
        apiUrl: 'http://localhost:5000/api/questions/ibps'
    },
    't12': {
        name: 'SBI PO',
        exam: 'sbipo',
        duration: 10 * 60, // 10 minutes
        colors: ['from-orange-500', 'to-amber-600', 'border-orange-500', 'bg-orange-50', 'dark:bg-orange-900/20'],
        description: 'State Bank of India Probationary Officer',
        apiUrl: 'http://localhost:5000/api/questions/sbipo'
    },
    't13': {
        name: 'NICL AO',
        exam: 'niclao',
        duration: 10 * 60, // 10 minutes
        colors: ['from-yellow-600', 'to-orange-500', 'border-yellow-600', 'bg-yellow-50', 'dark:bg-yellow-900/20'],
        description: 'National Insurance Company Limited Administrative Officer',
        apiUrl: 'http://localhost:5000/api/questions/niclao'
    },
    't8': {
        name: 'CLAT',
        exam: 'clat',
        duration: 10 * 60, // 10 minutes
        colors: ['from-indigo-500', 'to-purple-600', 'border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/20'],
        description: 'Common Law Admission Test',
        apiUrl: 'http://localhost:5000/api/questions/clat'
    },
    't9': {
        name: 'NDA',
        exam: 'nda',
        duration: 10 * 60, // 10 minutes
        colors: ['from-red-500', 'to-pink-600', 'border-red-500', 'bg-red-50', 'dark:bg-red-900/20'],
        description: 'National Defence Academy',
        apiUrl: 'http://localhost:5000/api/questions/nda'
    },
    't10': {
        name: 'UGC NET',
        exam: 'net',
        duration: 10 * 60, // 10 minutes
        colors: ['from-teal-500', 'to-cyan-600', 'border-teal-500', 'bg-teal-50', 'dark:bg-teal-900/20'],
        description: 'University Grants Commission National Eligibility Test',
        apiUrl: 'http://localhost:5000/api/questions/net'
    }
}

// Helper function to get test config by code
export function getTestConfig(testCode) {
    return testConfigs[testCode]
}

// Helper function to get all test codes for an exam
export function getTestsByExam(exam) {
    return Object.entries(testConfigs)
        .filter(([code, config]) => config.exam === exam)
        .map(([code, config]) => ({ code, ...config }))
}

// Helper function to get all available test codes
export function getAllTestCodes() {
    return Object.keys(testConfigs)
}

// Helper function to get test config by exam name (reverse lookup)
export function getTestConfigByExamName(examName) {
    // First try exact match
    for (const [code, config] of Object.entries(testConfigs)) {
        if (config.name.toLowerCase() === examName.toLowerCase()) {
            return { code, ...config }
        }
    }

    // Try partial match for cases like "jee" matching "JEE"
    for (const [code, config] of Object.entries(testConfigs)) {
        if (config.exam.toLowerCase() === examName.toLowerCase()) {
            return { code, ...config }
        }
    }

    return null
}
