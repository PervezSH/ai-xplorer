import { NextApiRequest, NextApiResponse } from 'next'
import { gpt3Models } from '../../../utils/model-data'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!Array.isArray(gpt3Models)) {
            throw new Error('Cannot find gpt3 models')
        }
        res.status(200).json(gpt3Models)
    } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler