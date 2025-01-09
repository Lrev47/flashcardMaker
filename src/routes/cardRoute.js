// src/routes/cardRoutes.js
import { Router } from "express";
import {
  createFlashcards,
  getTopicFlashcards,
  getSingleCard,
} from "../controllers/cardController.js";

const router = Router();

// POST /cards/:topicId - create multiple flashcards for a given topic
router.post("/:topicId", createFlashcards);

// GET /cards/:topicId - get all flashcards for a given topic
router.get("/:topicId", getTopicFlashcards);

// GET /cards/details/:cardId - get details of a single card
router.get("/details/:cardId", getSingleCard);

export default router;
