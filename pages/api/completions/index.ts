import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const configuration = new Configuration({
        apiKey: req.body.apiKey,
    });
    const openai = new OpenAIApi(configuration);

    const promises = req.body.modelsToCompare.map(async (model: ICompareInfo): Promise<ICompletionResult> => {
        try {
            const start = performance.now();
            const completion = await openai.createCompletion({
                model: model.name,
                prompt: req.body.prompt,
                max_tokens: model.tokens,
                temperature: req.body.temperature,
                top_p: req.body.topP,
                presence_penalty: req.body.presencePenalty,
                frequency_penalty: req.body.frequencyPenalty,
                best_of: req.body.bestOf,
            });
            const end = performance.now();
            const elapsedTime = end - start;

            const outputText = completion.data.choices[0].text;

            const promptTokens = completion.data.usage?.prompt_tokens;
            const completionTokens = completion.data.usage?.completion_tokens;
            const totalTokens = promptTokens && completionTokens ? promptTokens + completionTokens : undefined;

            return {
                modelName: model.name,
                elapsedTime: elapsedTime,
                outputText: outputText,
                promptTokens: promptTokens,
                completionTokens: completionTokens,
                totalTokens: totalTokens,
            };
        } catch (error) {
            throw error;
        }

    });

    try {
        const results = await Promise.all(promises);
        res.status(200).json({ output: results });
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).json({ statusCode: error.response.status, statusText: error.response.statusText });
        } else {
            res.status(500).json({ statusCode: 500, message: error.message });
        }
    }
};

export default handler;