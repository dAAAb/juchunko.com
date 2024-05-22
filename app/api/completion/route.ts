import { createOpenAI } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText } from 'ai'
import { env } from 'process'
export const dynamic = 'force-dynamic'
const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
  baseURL: 'https://gateway.ai.cloudflare.com/v1/3f1f83a939b2fc99ca45fd8987962514/juchunko-com/openai',
})
export async function POST(req: Request) {
  const systemPrompt = `你是國民黨立委葛如鈞（寶博士）網站的 AI 助手
  1. 請根據頁面內容回答使用者的問題，若無法回答請告知使用者。
  2. 請不要回答與頁面內容無關的問題
  3. 請根據頁面內容資訊回答問題
  4. 盡可能簡短、友善回答
  5. 請以使用者的語言回答問題
  6. 目前你只能看到目前頁面的內容，若目前沒有你需要的資訊，請告知使用者請切換到相對應的頁面。`

  const { messages, filename, prompt } = await req.json()

  const fileData = await fetch(`https://raw.githubusercontent.com/dAAAb/juchunko.com/main/pages${filename}.zh-TW.mdx`, {
    cache: 'force-cache',
  }).then((res) => res.text())
  const response = await streamText({
    model: openai('gpt-4o'),
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'system',
        content: `base: https://juchunko.com/\n目前頁面內容：\n${fileData}`,
      },
      ...messages,
      {
        role: 'user',
        content: prompt,
      },
    ],
    maxTokens: 4000,
  })
  // Convert the response into a friendly text-stream
  return new StreamingTextResponse(response.toAIStream())
}
