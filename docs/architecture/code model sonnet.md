import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  // defaults to process.env["ANTHROPIC_API_KEY"]
  apiKey: "my_api_key",
});

const msg = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 8192,
  temperature: 1,
  messages: [],
  output_config: {"effort":"high"}
});
console.log(msg);



