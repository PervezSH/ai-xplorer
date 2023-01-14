interface ICompareInfo {
  name: string;
  maxTokens: number;
  tokens: number;
  maxCreditUsage: number;
  creditUsage: number;
  elapsedTime: number;
  output: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface ICompletionResult {
  modelName: string;
  elapsedTime: number;
  outputText: string | undefined;
  promptTokens: number | undefined;
  completionTokens: number | undefined;
  totalTokens: number | undefined;
}
