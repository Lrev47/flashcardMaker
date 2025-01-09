// src/services/questionService.js

import prisma from "../config/prismaClient.js";

/**
 * Generate Q&A pairs and save them to a topic
 */
export async function createQuestionsForTopic(topicId, qaPairs) {
  // qaPairs is expected to be an array of objects { text, answer }
  const promises = qaPairs.map((pair) =>
    prisma.question.create({
      data: {
        text: pair.text,
        answer: pair.answer,
        topicId,
      },
    })
  );
  return Promise.all(promises);
}

/**
 * Fetch questions for a specific topic
 */
export async function getQuestionsByTopicId(topicId) {
  return await prisma.question.findMany({
    where: { topicId },
  });
}
