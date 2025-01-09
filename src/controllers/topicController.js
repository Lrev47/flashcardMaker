// src/controllers/topicController.js

import {
  createTopic,
  getTopicById,
  getTopicTree,
  addSubtopics,
} from "../services/topicService.js";

/**
 * Create a new Topic (can be top-level or a subtopic)
 */
export async function createNewTopic(req, res, next) {
  try {
    // Expected data: { name, overview, parentTopicId? }
    const { name, overview, parentTopicId } = req.body;

    const newTopic = await createTopic({ name, overview, parentTopicId });
    return res.status(201).json(newTopic);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieve a single Topic by ID
 */
export async function fetchTopicById(req, res, next) {
  try {
    const { id } = req.params;
    const topic = await getTopicById(id);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found." });
    }
    res.json(topic);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieve the full Topic tree (optional deeper nesting)
 */
export async function fetchTopicTree(req, res, next) {
  try {
    const { id } = req.params;
    const topicTree = await getTopicTree(id);
    if (!topicTree) {
      return res.status(404).json({ error: "Topic not found." });
    }
    res.json(topicTree);
  } catch (error) {
    next(error);
  }
}

/**
 * Add multiple subtopics under a parent topic
 */
export async function expandSubtopics(req, res, next) {
  try {
    const { id } = req.params; // parentTopicId
    const subtopicDataArray = req.body.subtopics;
    // e.g. [{ name: 'Subtopic1', overview: '...' }, ...]

    const subtopics = await addSubtopics(id, subtopicDataArray);
    res.status(201).json(subtopics);
  } catch (error) {
    next(error);
  }
}
