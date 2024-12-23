const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPEN_AI_MODEL = 'gpt-3.5-turbo-0125';

export type AIResponseObject = {
  index: number;
  message: {
    role: string;
    content: string;
    refusal: string | null;
  };
  logprobs: unknown | null;
  finish_reason: string;
};

type ErrorResponse = {
  error: boolean;
  message: string;
};

export interface AIRequestData {
  title: string;
  categoryId: string;
  topic: string;
  description: string;
  itemsAmount: string;
  language: string;
}

export async function sendAIRequest(
  data: AIRequestData
): Promise<AIResponseObject | ErrorResponse> {
  const prompt = `Generate a list of ${data.itemsAmount} items on the topic of "${data.topic}". 
The items should follow this description: "${data.description}".
Output only the list, with each item on a new line, without any title, numbering, or extra text. Provide the output in ${data.language}.`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPEN_AI_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant who provides short lists on items in different topics.',
          },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0];
  } catch (error) {
    console.log('error', error);
    const eString = JSON.stringify(error);

    return {
      error: true,
      message: eString,
    };
  }
}
