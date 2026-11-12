interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AIResponse {
  content: string;
  usage?: { input_tokens?: number; output_tokens?: number };
}

export async function callAI(messages: AIMessage[]): Promise<AIResponse> {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || "claude-sonnet-4-6";
  const baseUrl = process.env.AI_BASE_URL || "https://api.anthropic.com";

  if (!apiKey) {
    throw new Error("AI_API_KEY is not configured");
  }

  const isAnthropic = baseUrl.includes("anthropic.com") || model.startsWith("claude");

  if (isAnthropic) {
    const systemMsg = messages.find(m => m.role === "system");
    const userMessages = messages.filter(m => m.role !== "system");

    const response = await fetch(`${baseUrl}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 2048,
        system: systemMsg?.content,
        messages: userMessages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`AI API error: ${response.status} - ${err}`);
    }

    const data = await response.json();
    return {
      content: data.content[0]?.text || "",
      usage: { input_tokens: data.usage?.input_tokens, output_tokens: data.usage?.output_tokens },
    };
  }

  // OpenAI-compatible
  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`AI API error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0]?.message?.content || "",
    usage: {
      input_tokens: data.usage?.prompt_tokens,
      output_tokens: data.usage?.completion_tokens,
    },
  };
}

export function parseJsonSafely<T>(text: string, fallback: T): T {
  try {
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/(\{[\s\S]*\})/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}
