import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../utils/mongodb'
import { OpenAI } from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method Not Allowed`);
    }

    const { injuryDescription, userId, injuryType, severity, medicationTaken, targetHabits } = req.body;
    const client = await clientPromise;
    const db = client.db("Injurney");

    const user = await db.collection("users").findOne({ _id: userId }); 

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const userInfo = `Age: ${user.age}, Condition: ${user.condition}, Injury Type: ${injuryType}, Severity: ${severity}, Medication Taken: ${medicationTaken}, Target Habits: ${targetHabits}`;

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_SECRET_KEY,
    });

    try {
        const completionResponse = await openai.completions.create({
            model: "gpt-4-turbo-preview", 
            prompt: `User Information: ${userInfo}\nAnalyze this injury: ${injuryDescription}\n\nSuggestions:`,
            temperature: 0.7,
            max_tokens: 512,
        });

        const rawText = completionResponse.choices[0].text.trim();
        const suggestions = rawText.split('\n').filter(line => line.trim() !== '');

        return res.status(200).json({ result: suggestions });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return res.status(500).json({ error: 'Failed to process the request' });
    }
}
