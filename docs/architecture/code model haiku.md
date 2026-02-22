import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  // defaults to process.env["ANTHROPIC_API_KEY"]
  apiKey: "my_api_key",
});

const msg = await anthropic.messages.create({
  model: "claude-haiku-4-5-20251001",
  max_tokens: 8192,
  temperature: 1,
  messages: []
});
console.log(msg);


