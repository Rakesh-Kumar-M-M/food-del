Health & DB notes for deploy

- The backend exposes `/health` that returns JSON:
  - { ok: true, dbConnected: boolean, mongooseState: number }
  - Use this to verify whether the process is up and whether Mongoose is connected.

- DB connection behavior:
  - If `MONGO_URL` is missing, the server will start but DB operations will fail.
  - The app will attempt up to 5 connection attempts with 2s delay by default.

- For Render:
  1. Ensure `MONGO_URL` and `JWT_SECRET` are set in the Service -> Environment variables.
  2. If using Mongo Atlas, ensure Network Access allows connections from Render (use 0.0.0.0/0 for testing).
  3. Use `/health` to confirm DB connection status after deployment.
