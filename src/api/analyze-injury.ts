import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../utils/mongodb'
import { OpenAI } from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method Not Allowed`);
    }

    const { injuryDescription, userId } = req.body;
    const client = await clientPromise;
    const db = client.db("Injurney");

    const user = await db.collection("users").findOne({ _id: userId }); 

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const userInfo = `Age: ${user.age}, Condition: ${user.condition}`;

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_SECRET_KEY,
    });

    try {
        const completionResponse = await openai.completions.create({
            model: "gpt-4-turbo-preview", 
            prompt: `Analyze this injury: ${injuryDescription}\n\nSuggestions:`,
            temperature: 0.7,
            max_tokens: 512,
        });

        return res.status(200).json({ result: completionResponse.choices[0].text.trim() });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return res.status(500).json({ error: 'Failed to process the request' });
    }
}
