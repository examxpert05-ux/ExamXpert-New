import express from 'express';
import fileStorage from '../utils/fileStorage';

const router = express.Router();

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

// Middleware to verify Firebase token (simplified for now)
const authenticateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // For now, we'll assume the token contains the user ID
        // In production, you'd verify the Firebase token
        const token = authHeader.substring(7);

        // For file storage, we'll use the token as userId directly
        req.user = { _id: token, id: token };
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ message: 'Authentication error' });
    }
};

// Save test result
router.post('/save', authenticateUser, async (req, res) => {
    try {
        const { exam, answers, score, timeSpent, questions, username } = req.body;
        const userId = req.user._id;

        // Save test result using file storage with new schema
        const savedTest = fileStorage.saveTest({
            userId,
            username: username || req.user.username || 'Anonymous',
            testId: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            testName: exam,
            result: `${score}%`,
            responseData: {
                answers,
                score,
                timeSpent,
                questions,
                questionDetails: [] // Can be populated later if needed
            }
        });

        res.status(201).json({
            message: 'Test result saved successfully',
            testId: savedTest.test_id
        });
    } catch (error) {
        console.error('Save test error:', error);
        res.status(500).json({ message: 'Failed to save test result' });
    }
});

// Get user's test history
router.get('/history', authenticateUser, async (req, res) => {
    try {
        const userId = req.user._id;

        const tests = fileStorage.getUserTests(userId);

        // Sort by test date (most recent first)
        tests.sort((a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime());

        res.json(tests);
    } catch (error) {
        console.error('Get test history error:', error);
        res.status(500).json({ message: 'Failed to get test history' });
    }
});

// Get specific test result
router.get('/:testId', authenticateUser, async (req, res) => {
    try {
        const { testId } = req.params;
        const userId = req.user._id;

        const test = fileStorage.getTestById(userId, testId);

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        res.json(test);
    } catch (error) {
        console.error('Get test error:', error);
        res.status(500).json({ message: 'Failed to get test result' });
    }
});

// Get user's tests by exam type
router.get('/exam/:examType', authenticateUser, async (req, res) => {
    try {
        const { examType } = req.params;
        const userId = req.user._id;

        const tests = fileStorage.getTestsByExam(userId, examType);

        // Sort by test date (most recent first)
        tests.sort((a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime());

        res.json(tests);
    } catch (error) {
        console.error('Get tests by exam error:', error);
        res.status(500).json({ message: 'Failed to get tests' });
    }
});

export default router;
