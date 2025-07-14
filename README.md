

# 🧠 AI E-Commerce Dashboard

A full-stack, data-driven dashboard that visualizes sales, product trends, and AI insights using **Next.js**, **Express**, **MySQL**, and **Recharts**.

## 🚀 Features

- 📊 Realtime Sales Visualization (Bar + Line Charts)
- 🛒 Product Performance Table with Search, Pagination & CSV Export
- 🤖 AI Market Insights (OpenAI API integrated)
- 🌍 Global Order Trends by Country
- 🔐 Add/Delete Sales with Modal UI
- 📦 Backend API for Sales, Orders, Metrics
- 🎯 Responsive & Dark Mode Friendly

---

## 🧰 Tech Stack

| Layer      | Technology                         |
|------------|-------------------------------------|
| Frontend   | Next.js 14 (App Router, TypeScript) |
| Charts     | Recharts                            |
| UI         | TailwindCSS + Lucide Icons          |
| Backend    | Express.js + REST API               |
| Database   | MySQL with `mysql2` + Pooling       |
| AI Engine  | Gemini API (for Insight Generation) |
| Auth       | (Coming soon...)                    |

---

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-ecommerce-dashboard.git
cd ai-ecommerce-dashboard
````

### 2. Install Frontend & Backend Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Configure `.env` Files

Create `.env` inside `backend/`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=insightify
OPENAI_API_KEY=your_openai_api_key
```

### 4. Start the Backend

```bash
cd backend
npm run dev
```

### 5. Start the Frontend

```bash
cd frontend
npm run dev
```

---

## 🧪 Sample SQL (for Local DB Setup)

```sql
CREATE DATABASE insightify;
USE insightify;

/* Users */
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);

/* Products */
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  price DECIMAL(10, 2),
  stock INT
);



/* Sales */
CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product VARCHAR(100),
  customer VARCHAR(100),
  amount VARCHAR(20),
  date DATE
);
```

---

## 📦 API Routes

| Method | Route                  | Purpose              |
| ------ | ---------------------- | -------------------- |
| GET    | `/api/metrics/summary` | Dashboard metrics    |
| GET    | `/api/orders`          | Order data for cards |
| GET    | `/api/ai/insights`     | AI insights (GPT)    |
| POST   | `/api/sales`           | Add a new sale entry |

---



## 🧠 AI Insights

This dashboard integrates Gemini AI's model to generate market insights and predictions based on sales and user behavior.

---

## 👨‍💻 Contributing

Contributions welcome! Fork the repo, create a branch, and submit a PR.




