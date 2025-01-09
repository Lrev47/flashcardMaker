// src/server.js

import express from "express";
import topicRoutes from "./routes/topicRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/topics", topicRoutes);
app.use("/questions", questionRoutes);

// Global error handler (simple example)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
