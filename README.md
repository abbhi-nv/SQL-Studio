
🧠 CipherSQL Studio – Full Stack SQL Learning Platform

CipherSQL Studio is an interactive SQL practice platform built as part of the CipherSchools Full Stack Assignment.
It allows users to solve SQL assignments of varying difficulty, execute queries in real time, get instant correctness feedback, and track progress — all in a clean, professional UI.

⸻

🚀 Features Implemented

✅ Core Features
	•	SQL Editor with query execution
	•	PostgreSQL-backed SQL execution engine
	•	Query result table rendering
	•	Query history (last 5 queries)
	•	Clean, responsive UI (desktop-focused)

✅ Assignment System
	•	45 SQL assignments
	•	15 Easy
	•	15 Medium
	•	15 Hard
	•	Difficulty selector
	•	Assignment list per difficulty
	•	Detailed assignment view:
	•	Title
	•	Description
	•	Schema

✅ Auto-Check Correctness
	•	Automatically validates:
	•	Returned column names
	•	Shows instant feedback:
	•	✅ Correct answer
	•	❌ Incorrect (with reason)

✅ Hints & Expected Output
	•	Each assignment supports:
	•	SQL hint (shown only on wrong answer)
	•	Expected output preview (for learning clarity)

✅ Progress Tracking
	•	Completed assignments are visually marked
	•	Progress tracked per difficulty + assignment
	•	Completion status updates automatically after correct solution

⸻

🧩 Tech Stack

Frontend
	•	React (Hooks)
	•	SCSS (custom styling)
	•	Fetch API

Backend
	•	Node.js
	•	Express.js
	•	PostgreSQL
	•	pg library

⸻

📁 Project Structure

SQLstudio/
├── backend/
│   ├── controllers/
│   │   └── execute.controller.js
│   ├── db/
│   │   └── postgres.js
│   ├── routes/
│   │   └── execute.route.js
│   ├── server.js
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── data/
│   │   │   └── assignments.js
│   │   ├── styles/
│   │   │   └── App.scss
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
├── README.md


⸻

⚙️ Setup Instructions

1️⃣ Backend Setup

cd backend
npm install

Create .env file:

PORT=5050
DATABASE_URL=postgres://username:password@localhost:5432/sqlstudio

Start backend:

npm run dev


⸻

2️⃣ Frontend Setup

cd frontend
npm install
npm start

Frontend runs at:

http://localhost:3000

Backend runs at:

http://localhost:5050


⸻

🧪 How Auto-Check Works
	1.	User writes SQL query
	2.	Backend executes query on PostgreSQL
	3.	Frontend receives:
	•	columns
	•	rows
	4.	System compares:
	•	Returned columns
	•	Expected columns defined per assignment
	5.	Result:
	•	✅ Correct → marked completed
	•	❌ Incorrect → hint shown

⸻

📊 Progress Tracking Logic
	•	Each assignment has a unique key:

difficulty-assignmentId


	•	On correct solution:
	•	Assignment marked as completed
	•	UI updates visually
	•	Progress persists during session

⸻

📝 Assignment Data Format

Each assignment follows this structure:

{
  id: 1,
  title: "Students & Courses Analysis",
  difficulty: "Easy",
  description: "...",
  schema: `...`,
  expectedColumns: ["name", "marks", "faculty"],
  expectedOutput: `
Alice | 85 | Dr. Sharma
Bob   | 90 | Dr. Sharma
`,
  hint: "Use JOIN on course name"
}


⸻

🎯 Matching With CipherSchools Assignment

Requirement	Status
SQL Editor	✅
Backend SQL Execution	✅
Multiple Assignments	✅
Difficulty Levels	✅
Auto-check Correctness	✅
Hints & Expected Output	✅
Progress Tracking	✅
Professional UI	✅
Full Stack Implementation	✅

Overall Match: ✅ 100%

⸻

🔮 Future Enhancements (Optional)
	•	Persist progress using database
	•	User authentication
	•	Timer per assignment
	•	SQL syntax highlighting (Monaco Editor)
	•	Leaderboard

⸻

👨‍💻 Author

Abhinav Kumar Singh
Full Stack Developer
CipherSchools Assignment Submission

⸻