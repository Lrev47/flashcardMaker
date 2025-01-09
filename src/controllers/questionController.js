// src/controllers/questionController.js

import {
  createQuestionsForTopic,
  getQuestionsByTopicId,
} from "../services/questionService.js";

export async function addQuestions(req, res, next) {
  try {
    const { id } = req.params; // topicId
    const { qaPairs } = req.body;
    // Format: { qaPairs: [ { text: "Question1", answer: "Answer1" }, ... ] }

    const result = await createQuestionsForTopic(id, qaPairs);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function fetchQuestionsByTopic(req, res, next) {
  try {
    const { id } = req.params; // topicId
    const questions = await getQuestionsByTopicId(id);
    res.json(questions);
  } catch (error) {
    next(error);
  }
}
