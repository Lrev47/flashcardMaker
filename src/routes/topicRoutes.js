// src/routes/topicRoutes.js
import { Router } from "express";
import {
  createNewTopic,
  fetchTopicById,
  fetchTopicTree,
  expandSubtopics,
} from "../controllers/topicController.js";

const router = Router();

// POST /topics - create a top-level or subtopic
router.post("/", createNewTopic);

// GET /topics/:id - fetch a single topic (including subtopics & cards if needed)
router.get("/:id", fetchTopicById);

// GET /topics/:id/tree - fetch an expanded topic tree
router.get("/:id/tree", fetchTopicTree);

// POST /topics/:id/subtopics - add multiple subtopics to an existing topic
router.post("/:id/subtopics", expandSubtopics);

export default router;
