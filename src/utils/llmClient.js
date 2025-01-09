// src/utils/llmClient.js

import fetch from "node-fetch";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Example function to get subtopics with high-level overviews
 */
export async function getSubtopicsWithOverviews(topicName) {
  const prompt = `Break down the topic "${topicName}" into key subtopics. 
  Provide each subtopic with a short overview in JSON form, e.g.:
  [
    { "name": "Subtopic 1", "overview": "..." },
    ...
  ]`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  let subtopics = [];
  try {
    subtopics = JSON.parse(data.choices[0].message.content);
  } catch (err) {
    console.error("Error parsing LLM response as JSON:", err);
  }

  return subtopics;
}

/**
 * Example function to generate flashcard Q&A pairs with detailed explanations
 */
export async function generateFlashcards(topicName) {
  const prompt = `Generate 5 flashcards for the topic "${topicName}". 
  For each flashcard, provide a question, a short answer, and a more detailed explanation. 
  Return in JSON array format, e.g.:
  [
    {
      "question": "...",
      "answer": "...",
      "detailedExplanation": "..."
    },
    ...
  ]`;

  // Similar fetch to the LLM...
  // Return parsed JSON
}
