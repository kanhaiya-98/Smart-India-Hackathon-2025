#!/bin/bash
# Start the backend in the background
cd backend
npm run dev &
BACKEND_PID=$!

# Go back to root and start the frontend
cd ..
npm run dev

# When the frontend exits, also kill the backend
kill $BACKEND_PID
