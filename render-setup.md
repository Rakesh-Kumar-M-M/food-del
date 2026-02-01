# Render deployment quick setup

## Overview
This repo contains a Node backend at `food-del/backend` and a Vite React frontend at `food-del/frontend`.

## Steps on Render
1. Create a new **Web Service** in Render:
   - Connect your GitHub repo and pick the `main` branch.
   - Set **Root Directory** to `food-del/backend`.
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment: Node
   - Add environment variables in Render dashboard (these are secrets):
     - `MONGO_URL` (your Production MongoDB URI)
     - `JWT_SECRET` (a secure random string)
     - `STRIPE_SECRET_KEY` (if you use Stripe)
     - `FRONTEND_URL` (optional)

2. Create a new **Static Site** in Render for the frontend:
   - Root Directory: `food-del/frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Add build-time environment variable: `VITE_API_URL` set to your backend URL (e.g. https://food-del-backend.onrender.com)

## Important notes
- The backend now requires `MONGO_URL` to be set; it will exit if not provided to avoid accidental use of hardcoded credentials.
- Remove any local `.env` containing secrets from the repo if present. Use `backend/.env.example` as a template.
- For file uploads, Render's filesystem is ephemeral; use S3/Cloudinary for persistent uploads.

## Debugging tips
- Check logs in Render for runtime errors.
- If DB fails to connect, verify IP/network access and `MONGO_URL` correctness (Mongo Atlas requires network access or SRV string).
