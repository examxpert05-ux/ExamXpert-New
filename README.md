# ExamXpert

A comprehensive, modern online testing platform built with React, Next.js, Node.js, and MongoDB.

## Features

- **10 Test Codes**: MVP with unique codes (t1-t10) for core exam subjects
- **10 Major Indian Exams**: UPSC, JEE, NEET, CAT, GATE, SSC, Banking, CLAT, NDA, UGC NET
- **User Authentication**: JWT-based auth with email verification
- **Real-time Testing**: 10-minute timed tests with auto-submission
- **20 Questions Per Test**: Consistent question count across all tests
- **Analytics Dashboard**: Performance tracking and insights
- **Admin Panel**: Question management and user analytics
- **PWA Support**: Offline capabilities
- **AI Integration**: Smart recommendations and adaptive testing

## Test Code Architecture

ExamXpert uses a scalable test code system for better organization and management:

### Test Codes (Full Version)
Each test has a unique code (t1-t10) with exactly 20 questions and 10-minute duration:

| Test Code | Exam | Subject | Duration | Questions | Status |
|-----------|------|---------|----------|-----------|--------|
| t1 | UPSC | General Studies | 10 min | 20 Qs | ✅ Active |
| t2 | JEE | Physics | 10 min | 20 Qs | ✅ Active |
| t3 | NEET | Biology | 10 min | 20 Qs | ✅ Active |
| t4 | CAT | Quantitative | 10 min | 20 Qs | ✅ Active |
| t5 | GATE | Computer Science | 10 min | 20 Qs | ✅ Active |
| t6 | SSC | General Intelligence | 10 min | 20 Qs | ✅ Active |
| t7 | Banking | General Awareness | 10 min | 20 Qs | ✅ Active |
| t8 | CLAT | Legal Reasoning | 10 min | 20 Qs | ✅ Active |
| t9 | NDA | Mathematics | 10 min | 20 Qs | ✅ Active |
| t10 | UGC NET | General Paper | 10 min | 20 Qs | ✅ Active |

### How It Works

1. **Test Configuration**: All test configurations are stored in `frontend/app/test-configs.js`
2. **API Route**: `/api/questions/[testCode]` loads questions based on the test code
3. **Dynamic Routing**: Test pages use `/test/[testCode]` for individual tests
4. **Homepage Links**: Exam cards link to the first available test for each exam type

### Adding New Tests

To add a new test:

1. Add a new entry to `testConfigs` in `frontend/app/test-configs.js`:
   ```javascript
   't17': {
       name: 'New Exam - Subject',
       exam: 'newexam',
       duration: 2 * 60 * 60, // 2 hours
       colors: ['from-blue-500', 'to-purple-600', 'border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20'],
       description: 'Description of the test'
   }
   ```

2. Create the questions file at `database/tests/newexam/newexam.js`

3. Update the API route in `frontend/app/api/questions/[exam]/route.js` to handle the new exam

4. The system automatically handles the rest!

### Benefits

- **Scalability**: Easy to add new tests without changing routes
- **Organization**: Clear mapping between test codes and configurations
- **Flexibility**: Multiple tests per exam type (e.g., different subjects)
- **Maintainability**: Centralized configuration management

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 18 with TypeScript
- TailwindCSS + shadcn/ui
- Zustand for state management
- TanStack Query for data fetching
- React Hook Form + Zod for validation
- Recharts for data visualization
- Framer Motion for animations

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- Socket.io for real-time features
- Nodemailer for emails
- Cloudinary for file uploads

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Set up environment variables:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Edit `backend/.env` with your credentials (see below)
5. Start MongoDB
6. Run the backend:
   ```bash
   cd backend
   npm run dev
   ```
7. Run the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Environment Setup

#### Database
- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URI` in `.env`

#### Email (Gmail)
1. Enable 2-factor authentication on your Gmail
2. Generate an App Password: https://support.google.com/accounts/answer/185833
3. Set `EMAIL_USER=your-gmail@gmail.com`
4. Set `EMAIL_PASS=your-app-password`

#### JWT Secrets
- Use strong, random strings for `JWT_SECRET` and `JWT_REFRESH_SECRET`
- Generate with: `openssl rand -base64 32`

#### Cloudinary (Optional)
1. Sign up at https://cloudinary.com
2. Get your cloud name, API key, and API secret
3. Update the respective variables in `.env`

#### Sample Credentials for Development
The `.env` file contains sample values that work for local development (except email and Cloudinary which require setup).

## Project Structure

```
testing-app/
├── README.md
├── backend/                      # Node.js/Express API server
│   ├── .env                      # Environment variables
│   ├── .env.example             # Environment template
│   ├── package.json             # Backend dependencies
│   ├── tsconfig.json            # TypeScript configuration
│   └── src/                     # Source code
│       ├── app.ts               # Express app configuration
│       ├── index.ts             # Server entry point
│       ├── controllers/         # Route controllers
│       ├── data/                # Static data files
│       ├── middleware/          # Express middleware
│       ├── models/              # Mongoose models
│       │   ├── Question.ts      # Question schema
│       │   ├── Test.ts          # Test schema
│       │   └── User.ts          # User schema
│       ├── routes/              # API routes
│       │   └── questionRoutes.ts # Question endpoints
│       ├── services/            # Business logic services
│       └── utils/               # Utility functions
├── database/                    # Question database
│   └── tests/                   # Exam question files
│       ├── banking/
│       │   └── banking.js       # Banking exam questions (20)
│       ├── cat/
│       │   └── cat.js           # CAT exam questions (20)
│       ├── clat/
│       │   └── clat.js          # CLAT exam questions (20)
│       ├── gate/
│       │   └── gate.js          # GATE exam questions (20)
│       ├── jee/
│       │   └── iit.js           # JEE exam questions (20)
│       ├── nda/
│       │   └── nda.js           # NDA exam questions (20)
│       ├── neet/
│       │   └── neet.js          # NEET exam questions (20)
│       ├── net/
│       │   └── net.js           # UGC NET exam questions (20)
│       ├── ssc/
│       │   └── ssc.js           # SSC exam questions (20)
│       └── upsc/
│           └── upsc.js          # UPSC exam questions (20)
├── frontend/                    # Next.js React application
│   ├── .gitignore
│   ├── components.json          # shadcn/ui configuration
│   ├── eslint.config.mjs        # ESLint configuration
│   ├── next.config.js           # Next.js configuration
│   ├── next.config.ts           # Next.js TypeScript config
│   ├── package.json             # Frontend dependencies
│   ├── postcss.config.mjs       # PostCSS configuration
│   ├── tailwind.config.ts       # Tailwind CSS configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── app/                     # Next.js App Router
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   ├── test-configs.js      # Test configuration mapping
│   │   ├── (auth)/              # Authentication routes
│   │   │   └── login/
│   │   │       └── page.tsx     # Login page
│   │   ├── (dashboard)/         # Dashboard routes
│   │   │   └── page.tsx         # Dashboard page
│   │   ├── about/               # About page
│   │   │   └── page.tsx
│   │   ├── admin/               # Admin panel
│   │   │   └── page.tsx
│   │   ├── api/                 # API routes (currently empty)
│   │   ├── blog/                # Blog page
│   │   │   └── page.tsx
│   │   ├── deleteMe/            # Temporary test page (to be removed)
│   │   │   └── page.tsx
│   │   └── test/                # ⭐ SCALABLE: Dynamic test routes
│   │       └── [testId]/
│   │           └── page.tsx     # ⭐ SINGLE PAGE handles ALL tests dynamically
│   ├── components/              # Reusable React components
│   │   ├── animated-counter.tsx # Animated counter component
│   │   ├── navigation.tsx       # Navigation component
│   │   ├── theme-provider.tsx   # Theme provider
│   │   ├── charts/              # Chart components
│   │   ├── forms/               # Form components
│   │   └── ui/                  # UI components (shadcn/ui)
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       └── card.tsx
│   └── lib/                     # Utility libraries
│       └── utils.ts             # Utility functions
└── shared/                      # Shared utilities (currently empty)
```

## Architecture Notes

### ✅ Scalable Dynamic Test System
- **Single Test Page**: `frontend/app/test/[testId]/page.tsx` handles ALL tests
- **Dynamic Configuration**: Loads test settings from `test-configs.js` based on URL parameter
- **API Integration**: Fetches questions dynamically from backend
- **Scalability**: Add 1000+ tests by just updating config files

### 🧹 Architecture Cleanup Completed
- **Removed Redundant Pages**: All individual exam pages deleted for maintainability
- **Clean Structure**: Only dynamic test system remains
- **Homepage Links**: Use scalable routes `/test/t1`, `/test/t2`, etc.
- **Future-Proof**: Ready for unlimited test expansion

### 🎯 Current Status
- ✅ **10 Tests Active**: All working with 20 questions each
- ✅ **Dynamic System**: Fully scalable for unlimited tests
- ✅ **API Backend**: Serves questions from database dynamically
- ✅ **Frontend**: Single page handles all test variations
- ✅ **Clean Architecture**: No redundant code or pages

## API Documentation

API endpoints are documented with Swagger. Access at `/api/docs` when running the backend.

## Deployment

The application is configured for deployment on Vercel (frontend) and Railway/Heroku (backend).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License
