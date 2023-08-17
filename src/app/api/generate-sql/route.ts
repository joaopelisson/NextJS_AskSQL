 
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
export const runtime = 'edge'
 
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!
})
 
export async function POST(req: Request) {
  const { schema, promp } = await req.json()

  const message = `
  O Seu trabalho é criar Querys em SQL A partir de um schema SQL Abaixo.
  """
  ${schema}
  """
  A partir do schema acima, escreveva uma query SQL a partir da solicitação abaixo.
  me retorne somente o SQL, nada alem disso!

  Solicitação: ${promp}

  `.trim()
 
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
        {role: 'user', content: message}
    ]
  })
 
  const stream = OpenAIStream(response)
 
  return new StreamingTextResponse(stream)
}