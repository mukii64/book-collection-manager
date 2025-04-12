#!/bin/bash
# Run Vite from frontend
cd frontend
yarn dev &
VITE_PID=$!
cd ..

# Run Laravel
cd backend
php artisan serve

# Optional: kill vite when Laravel server exits
kill $VITE_PID
