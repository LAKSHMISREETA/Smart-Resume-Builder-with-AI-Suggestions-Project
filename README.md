Smart Resume Builder (with AI Suggestions)

Objective:
A web app that builds resumes and suggests improvements using AI.

Tech Stack:
React.js · Node.js · Express · MongoDB · Tailwind CSS · OpenAI API

Features:

Form-based resume editor with live preview

AI-powered resume improvement suggestions (GPT-3.5)

Save/load resumes via MongoDB

Export to PDF with print styling

Setup:

# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install
# .env
PORT=4000
MONGODB_URI=your_mongo_uri
OPENAI_API_KEY=your_openai_key
npm run dev


Endpoints:

POST /api/resumes — create

GET /api/resumes/:id — fetch

POST /api/resumes/:id/suggest — get AI tips

GET /api/resumes/:id/export — PDF export

Mini Guide:
Users fill forms → resume preview updates live → AI suggests improvements → export PDF.
Use GPT-3.5 (free tier) via Node backend for suggestions.

Deliverables:
✅ Interactive builder
✅ PDF export
✅ AI suggestion feature
