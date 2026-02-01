import mongoose from "mongoose"
// local -> mongodb://localhost:27017/
// global -> Use a production MongoDB URI via the MONGO_URL env var

/**
 * Attempts to connect to MongoDB with retries. Returns true on success, false on failure.
 * - If MONGO_URL is not set, it returns false but does NOT exit (so server can still run and report health).
 */
export const connectDB = async ({retries = 5, delay = 2000} = {}) => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    console.warn("MONGO_URL is not set. Backend will start but DB operations will fail. Set MONGO_URL in Render environment variables.");
    return false;
  }

  let attempt = 0;
  while (attempt < retries) {
    try {
      await mongoose.connect(mongoUrl, {
        // recommended options (Mongoose 6+ uses sensible defaults)
        // keep options here if needed
      });
      console.log("DB connected");
      return true;
    } catch (err) {
      attempt++;
      console.error(`DB connection attempt ${attempt} failed:`, err.message || err);
      if (attempt < retries) {
        console.log(`Retrying DB connection in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
      } else {
        console.error("All DB connection attempts failed.");
        return false;
      }
    }
  }
}
