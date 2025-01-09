// src/controllers/cardController.js

import {
  createCardsForTopic,
  getCardsByTopicId,
  getCardById,
} from "../services/cardService.js";

/**
 * Create multiple cards for a given Topic
 */
export async function createFlashcards(req, res, next) {
  try {
    const { topicId } = req.params;
    // Expecting array of cards data in the request body
    // e.g. { cards: [ { question, answer, detailedExplanation, qrCodeUrl }, ... ] }
    const { cards } = req.body;

    const createdCards = await createCardsForTopic(topicId, cards);
    return res.status(201).json(createdCards);
  } catch (error) {
    next(error);
  }
}

/**
 * Get all flashcards for a specific topic
 */
export async function getTopicFlashcards(req, res, next) {
  try {
    const { topicId } = req.params;
    const cards = await getCardsByTopicId(topicId);
    return res.json(cards);
  } catch (error) {
    next(error);
  }
}

/**
 * Get details for a single card by ID
 */
export async function getSingleCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const card = await getCardById(cardId);
    if (!card) {
      return res.status(404).json({ error: "Card not found." });
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
}
