import chatbotKnowledge from './chatbotKnowledge.js'

// Single source of truth: CHATBOT_KNOWLEDGE_BASE.md → chatbotKnowledge.js
const knowledgeBase = chatbotKnowledge

/**
 * Find the best matching answer for user input using keyword scoring.
 */
export function findBestMatch(input) {
  const normalized = input.toLowerCase().replace(/[^\w\s]/g, '')
  const words = normalized.split(/\s+/)

  let bestMatch = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
        score += 1
        if (words.includes(keyword)) {
          score += 0.5
        }
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  if (bestScore >= 1) {
    return bestMatch.answer
  }

  return FALLBACK_MESSAGE
}

export const FALLBACK_MESSAGE = "I don't have a specific answer for that, but I'd love to help! Try asking about Tali's projects, skills, experience, or philosophy. You can also reach him directly at mosley.tali@gmail.com."

export default knowledgeBase
