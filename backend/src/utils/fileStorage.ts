import fs from 'fs';
import path from 'path';

interface UserData {
    id: number;
    user_id: string;
    username: string;
    test_id: string;
    test_name: string;
    test_date: string;
    result: string;
    response_data: {
        answers: number[];
        score: number;
        timeSpent: number;
        questions: string[];
        questionDetails?: any[];
    };
    created_at: string;
    updated_at: string;
}

class FileStorage {
    private dataDir: string;
    private nextId: number = 1;

    constructor() {
        this.dataDir = path.join(__dirname, '../../../database');
        this.ensureDataDirectory();
        this.initializeNextId();
    }

    private ensureDataDirectory() {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }

    private initializeNextId() {
        // Find the highest ID across all user files
        const files = fs.readdirSync(this.dataDir).filter(file => file.endsWith('_tests.json'));
        let maxId = 0;

        for (const file of files) {
            try {
                const filePath = path.join(this.dataDir, file);
                const data = fs.readFileSync(filePath, 'utf8');
                const userData: UserData[] = JSON.parse(data);
                const fileMaxId = userData.length > 0 ? Math.max(...userData.map(item => item.id)) : 0;
                maxId = Math.max(maxId, fileMaxId);
            } catch (error) {
                // Skip corrupted files
                continue;
            }
        }

        this.nextId = maxId + 1;
    }

    private getUserFilePath(userId: string): string {
        return path.join(this.dataDir, `${userId}_tests.json`);
    }

    private readUserData(userId: string): UserData[] {
        const filePath = this.getUserFilePath(userId);
        if (!fs.existsSync(filePath)) {
            return [];
        }
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading user data:', error);
            return [];
        }
    }

    private writeUserData(userId: string, userData: UserData[]) {
        const filePath = this.getUserFilePath(userId);
        try {
            fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
        } catch (error) {
            console.error('Error writing user data:', error);
            throw error;
        }
    }

    // Save test result with the specified schema
    saveTest(testData: {
        userId: string;
        username: string;
        testId: string;
        testName: string;
        result: string;
        responseData: {
            answers: number[];
            score: number;
            timeSpent: number;
            questions: string[];
            questionDetails?: any[];
        };
    }): UserData {
        const userData = this.readUserData(testData.userId);
        const now = new Date().toISOString();

        const newEntry: UserData = {
            id: this.nextId++,
            user_id: testData.userId,
            username: testData.username,
            test_id: testData.testId,
            test_name: testData.testName,
            test_date: now,
            result: testData.result,
            response_data: testData.responseData,
            created_at: now,
            updated_at: now
        };

        userData.push(newEntry);
        this.writeUserData(testData.userId, userData);
        return newEntry;
    }

    // Get all test data for a user
    getUserTests(userId: string): UserData[] {
        return this.readUserData(userId);
    }

    // Get a specific test by ID
    getTestById(userId: string, testId: string): UserData | null {
        const userData = this.readUserData(userId);
        return userData.find(test => test.test_id === testId) || null;
    }

    // Get tests by exam type (test_name)
    getTestsByExam(userId: string, examType: string): UserData[] {
        const userData = this.readUserData(userId);
        return userData.filter(test => test.test_name.toLowerCase().includes(examType.toLowerCase()));
    }

    // Get all tests (for admin purposes)
    getAllTests(): UserData[] {
        const files = fs.readdirSync(this.dataDir).filter(file => file.endsWith('_tests.json'));
        let allTests: UserData[] = [];

        for (const file of files) {
            const userId = file.replace('_tests.json', '');
            const userTests = this.readUserData(userId);
            allTests = allTests.concat(userTests);
        }

        return allTests;
    }
}

export default new FileStorage();
