// src/services/topicService.js

import prisma from "../config/prismaClient.js";

/**
 * Create a new topic or subtopic
 * @param {Object} data - { name, overview, parentTopicId }
 */
export async function createTopic(data) {
  return prisma.topic.create({ data });
}

/**
 * Find a topic by its ID, including subtopics and cards (if needed).
 */
export async function getTopicById(id) {
  return prisma.topic.findUnique({
    where: { id },
    include: {
      subTopics: true,
      cards: true,
    },
  });
}

/**
 * Recursively fetch an entire topic tree (optional approach).
 * For deeper nesting, implement a custom function that iterates or recurses.
 */
export async function getTopicTree(id) {
  return prisma.topic.findUnique({
    where: { id },
    include: {
      subTopics: {
        include: {
          subTopics: true,
        },
      },
      cards: true,
    },
  });
}

/**
 * Add subtopics under a parent topic.
 * @param {String} parentTopicId
 * @param {Array} subtopicDataArray - e.g. [{ name: 'Subtopic 1', overview: '...' }, ...]
 */
export async function addSubtopics(parentTopicId, subtopicDataArray) {
  const results = [];
  for (const data of subtopicDataArray) {
    const subtopic = await prisma.topic.create({
      data: {
        ...data,
        parentTopicId,
      },
    });
    results.push(subtopic);
  }
  return results;
}
