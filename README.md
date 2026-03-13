# MERN Hackathon Skeleton

A clean, minimal, and premium MERN stack starter for hackathons.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB (Mongoose), dotenv, CORS
- **Tooling**: Nodemon (Backend development)

## Folder Structure
```text
mern-hackathon/
├── frontend/        # React + Vite + Tailwind
└── backend/         # Express + MongoDB
```

## Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas URI

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Create a `.env` file in the `backend` folder and add your `MONGO_URI`.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Ready to Code!
The frontend is pre-configured to proxy `/api` requests to `http://localhost:5000`.
Happy Hacking! 🚀
