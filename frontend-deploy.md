# Frontend deployment steps for Render (using existing backend)

If your backend is already deployed at: https://food-del-backend-srpm.onrender.com/

Follow these steps to ensure the frontend is built with the correct API URL:

1. In Render dashboard -> your Static Site service (or create one):
   - Connect your GitHub repo and set **Root Directory** to `food-del/frontend`.
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

2. Important: Add a **Build Environment Variable** named `VITE_API_URL` with value:
   - `https://food-del-backend-srpm.onrender.com` (no trailing slash preferred)
   - This will be available as `import.meta.env.VITE_API_URL` in the built app.

3. Trigger a manual deploy (Deploys -> Manual Deploy -> Redeploy Master/Main) or push a commit.

4. Troubleshooting:
   - If the site shows stale data, clear the browser cache and try again.
   - Check the Render build logs for Vite errors during build.
   - Check your browser console for network errors (CORS, 404s). Backend uses `cors()` so cross-origin should be OK.

5. Optional local test:
   - Create `.env.production` in `food-del/frontend` with a line:
     `VITE_API_URL=https://food-del-backend-srpm.onrender.com`
   - Run `npm run build` locally and then `npm run preview` to verify the built app calls the correct API.
