export interface IModelDetails {
  id: string;
  base: string;
  max: number;
  pricePerToken: number;
  description: string;
  goodAt: string;
}

export const gpt3Models: IModelDetails[] = [
  {
    id: "text-davinci-003",
    base: "Davinci",
    max: 4000,
    pricePerToken: 0.00002,
    description:
      "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following.",
    goodAt: "Complex intent, cause and effect, summarization for audience",
  },
  {
    id: "text-curie-001",
    base: "Curie",
    max: 2048,
    pricePerToken: 0.000002,
    description: "Very capable, but faster and lower cost than Davinci.",
    goodAt:
      "Language translation, complex classification, text sentiment, summarization",
  },
  {
    id: "text-babbage-001",
    base: "Babbage",
    max: 2048,
    pricePerToken: 0.0000005,
    description: "Fast and cheap, but less capable than Curie.",
    goodAt: "Moderate classification, semantic search classification",
  },
  {
    id: "text-ada-001",
    base: "Ada",
    max: 2048,
    pricePerToken: 0.0000004,
    description:
      "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
    goodAt: "Parsing text, simple classification, address correction, keywords",
  },
];
