import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../utils/mongodb';

interface UserPreferenceRequestBody {
    name: string;
    medicalCondition: string;
    age: string;
    height: string;
    weight: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
          const db = (await clientPromise).db("injurney");
    
          const { name, medicalCondition, age, height, weight } = req.body as UserPreferenceRequestBody;
    
          // Insert the user preferences into the database
          const result = await db.collection("userPreferences").insertOne({
            name, 
            medicalCondition, 
            age, 
            height, 
            weight, 
            createdAt: new Date()
          });
    
          res.status(200).json({ message: 'Preferences saved successfully!', result });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to save preferences' });
        }
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }


  }