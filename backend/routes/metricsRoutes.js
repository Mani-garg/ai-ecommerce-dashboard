import express from "express";
import db from "../models/db.js";

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const [[{ totalRevenue }]] = await db.query(`
      SELECT SUM(CAST(REPLACE(amount, '₹', '') AS UNSIGNED)) AS totalRevenue FROM sales;
    `);

    const [[{ totalOrders }]] = await db.query(`
      SELECT COUNT(*) AS totalOrders FROM sales;
    `);

    const [[{ totalUsers }]] = await db.query(`
      SELECT COUNT(*) AS totalUsers FROM users;
    `);

    res.json({
      revenue: `₹${totalRevenue?.toLocaleString() || '0'}`,
      orders: totalOrders?.toLocaleString() || '0',
      users: totalUsers?.toLocaleString() || '0',
    });
  } catch (err) {
    console.error("Metrics Summary Error:", err);
    res.status(500).json({ error: "Failed to fetch summary metrics" });
  }
});

export default router;
