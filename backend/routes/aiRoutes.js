import express from "express";
import db from "../models/db.js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/insights", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE(date) AS day, SUM(CAST(REPLACE(amount, '₹', '') AS UNSIGNED)) AS total_sales
      FROM sales
      WHERE date >= CURDATE() - INTERVAL 15 DAY
      GROUP BY day
      ORDER BY day;
    `);

    if (!rows.length) {
      return res.json({ insights: "No recent sales data available to analyze." });
    }

    const prompt = `
You are an analytics assistant. Analyze the following 15-day sales data and flag any anomalies (unexpected spikes or drops).

Return:
- Which days are anomalous
- Whether it’s a spike or drop
- Short reason why
- Does it look like a trend or one-time event?

Sales Data:
${JSON.stringify(rows, null, 2)}
    `;

  // Generate AI response using Gemini
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const result = await model.generateContent(prompt);
const response = await result.response;
const insights = response.text();

res.json({ insights });

  } catch (err) {
    console.error("AI Insights Error (Gemini):", err);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

export default router;
