import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('injurney'); 
    const user = await db.collection('userProfiles').findOne({ email: decodeURIComponent(email as string) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Failed to retrieve user data', error);
    res.status(500).json({ message: 'Failed to retrieve user data' });
  }
}
