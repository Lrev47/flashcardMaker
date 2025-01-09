// src/services/cardService.js

import prisma from "../config/prismaClient.js";

/**
 * Create multiple flashcards for a single topic.
 * @param {String} topicId
 * @param {Array} cardsData - e.g. [{ question, answer, detailedExplanation, qrCodeUrl }, ...]
 */
export async function createCardsForTopic(topicId, cardsData) {
  const createdCards = [];
  for (const card of cardsData) {
    const newCard = await prisma.card.create({
      data: {
        question: card.question,
        answer: card.answer,
        detailedExplanation: card.detailedExplanation,
        qrCodeUrl: card.qrCodeUrl,
        topicId,
      },
    });
    createdCards.push(newCard);
  }
  return createdCards;
}

/**
 * Fetch all flashcards for a specific topic
 */
export async function getCardsByTopicId(topicId) {
  return prisma.card.findMany({
    where: { topicId },
  });
}

/**
 * Fetch a single card by ID (to display details, e.g., in a QR code link)
 */
export async function getCardById(cardId) {
  return prisma.card.findUnique({
    where: { id: cardId },
  });
}
