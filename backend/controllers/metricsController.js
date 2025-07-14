import db from "../models/db.js";

export const getOverviewMetrics = async (req, res) => {
  try {
    const [[{ revenue }]] = await db.query(`SELECT SUM(total_price) as revenue FROM orders`);
    const [[{ orders }]] = await db.query(`SELECT COUNT(*) as orders FROM orders`);
    const [[{ users }]] = await db.query(`SELECT COUNT(*) as users FROM users`);
     const [[{ category }]] = await db.query(`
      SELECT p.category AS category
      FROM orders o
      JOIN products p ON o.product_id = p.id
      GROUP BY p.category
      ORDER BY COUNT(*) DESC
      LIMIT 1
    `);

    res.json({
      totalRevenue: revenue,
      totalOrders: orders,
      activeUsers: users,
      bestCategory: category || 'Unknown'
    });
  } catch (err) {
    console.error("Metrics fetch failed:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
