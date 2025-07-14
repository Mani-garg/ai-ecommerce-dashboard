import db from "../models/db.js";
import genAI from "../config/gemini.js";

export const getAIInsights = async (req, res) => {
  console.log("🚀 /api/ai/insights endpoint triggered");

  try {
    // Step 1: Fetch Data
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
    const [lowStock] = await db.query(`
      SELECT name, stock FROM products WHERE stock < 10 ORDER BY stock ASC LIMIT 3
    `);

    console.log("✅ DB data fetched");

    // Step 2: Create Prompt
    const prompt = `
You are a business analyst for an e-commerce platform.

Given the following stats:
- Total revenue: ₹${revenue}
- Total orders: ${orders}
- Active users: ${users}
- Top category: ${category}
- Low-stock products: ${lowStock.map(p => `${p.name} (${p.stock})`).join(", ")}

Generate 2-3 bullet point business insights in a friendly, helpful tone.
    `;

    console.log("✅ Prompt prepared");

    // Step 3: AI Call
   const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });


    const result = await model.generateContent(prompt);

    console.log("✅ AI response received");

    const aiMessage = result.response.text();

    res.json({ insights: aiMessage });
  } catch (err) {
    console.error("❌ AI insights error:", err);
    res.status(500).json({ message: "Failed to generate AI insights", error: err.message });
  }
};
