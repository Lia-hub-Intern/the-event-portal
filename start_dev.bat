@echo off
cd backend
start cmd /k "npm run dev"
cd ../frontend
start cmd /k "npm run dev"
start http://localhost:5173/