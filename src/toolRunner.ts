import type OpenAI from "openai"
import { generateImage, genImageToolDefinition } from "./tools/genImage"
import { reddit, redditToolDefinition } from "./tools/reddit"
import { dadJoke, dadJokeTookDefinition } from "./tools/dadJoke"

export const runTool = async (toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall, userMessage: string) => {
    const input = {
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments || '{}')
    }

    switch (toolCall.function.name) {
        case genImageToolDefinition.name:
            return generateImage(input)
        case redditToolDefinition.name:
            return reddit(input)
        case dadJokeTookDefinition.name:
            return dadJoke(input)
        default:
            return `Never run this tool: ${toolCall.function.name} again.`
    }
}