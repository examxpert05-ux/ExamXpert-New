import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

// Get the project root directory
const projectRoot = path.join(process.cwd(), '..');

// Map exam names to their file paths
const examFileMap: { [key: string]: string } = {
    'upsc': path.join(projectRoot, 'database/tests/upsc/upsc.js'),
    'jee': path.join(projectRoot, 'database/tests/jee/iit.js'),
    'neet': path.join(projectRoot, 'database/tests/neet/neet.js'),
    'cat': path.join(projectRoot, 'database/tests/cat/cat.js'),
    'gate': path.join(projectRoot, 'database/tests/gate/gate.js'),
    'ssc': path.join(projectRoot, 'database/tests/ssc/ssc.js'),
    'banking': path.join(projectRoot, 'database/tests/banking/banking.js'),
    'clat': path.join(projectRoot, 'database/tests/clat/clat.js'),
    'nda': path.join(projectRoot, 'database/tests/nda/nda.js'),
    'net': path.join(projectRoot, 'database/tests/net/net.js')
};

router.get('/:exam', (req, res) => {
    const { exam } = req.params;
    const filePath = examFileMap[exam];

    console.log(`Loading questions for ${exam} from: ${filePath}`);

    if (!filePath) {
        return res.status(404).json({ error: 'Test not available yet' });
    }

    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return res.status(404).json({ error: 'Test data not found' });
        }

        // Load the questions from the file
        const questions = require(filePath);

        // Handle both default export and named export
        const questionData = questions.default || questions;

        if (!Array.isArray(questionData) || questionData.length === 0) {
            return res.status(404).json({ error: 'No questions available for this test' });
        }

        console.log(`Successfully loaded ${questionData.length} questions for ${exam}`);
        res.json({ questions: questionData });
    } catch (error) {
        console.error(`Error loading questions for ${exam}:`, error);
        res.status(500).json({ error: 'Failed to load test questions' });
    }
});

export default router;
