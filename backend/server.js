import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./models/db.js";
import metricsRoutes from "./routes/metricsRoutes.js"; // <-- Import route
import aiRoutes from "./routes/aiRoutes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount route
app.use("/api/metrics", metricsRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS server_time");
    res.send(`Backend Running 🚀 | Server Time: ${rows[0].server_time}`);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("DB connection failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
