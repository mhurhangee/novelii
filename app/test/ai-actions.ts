"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateCompletion(prompt: string, context = "") {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are a helpful writing assistant. Complete the text naturally and concisely. Only return the completion text, no explanations.",
      prompt: `Context: ${context}\n\nComplete this text: ${prompt}`,
    })

    console.log(text)

    return { success: true, completion: text }
  } catch (error) {
    return { success: false, error: "Failed to generate completion" }
  }
}

export async function generateSuggestions(content: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are a writing assistant. Provide 3 brief, helpful suggestions to improve or continue the text. Return as a JSON array of strings.",
      prompt: `Analyze this text and provide suggestions: ${content}`,
    })

    console.log(text)

    // Parse the response as JSON array
    const suggestions = JSON.parse(text)
    return { success: true, suggestions }
  } catch (error) {
    return { success: false, suggestions: [] }
  }
}

export async function improveText(text: string, instruction: string) {
  try {
    const { text: improvedText } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are a writing assistant. Improve the given text according to the instruction. Only return the improved text.",
      prompt: `Instruction: ${instruction}\n\nText to improve: ${text}`,
    })

    console.log(text)

    return { success: true, improvedText }
  } catch (error) {
    return { success: false, error: "Failed to improve text" }
  }
}
