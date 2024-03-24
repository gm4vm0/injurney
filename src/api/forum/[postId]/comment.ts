import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { postId } = req.query;
    const { user, content } = req.body;

    const db = (await clientPromise).db("injurney");
    const result = await db.collection("forumPosts").updateOne(
      { _id: new ObjectId(postId as string) },
      { $push: { comments: { _id: new ObjectId(), user, content } } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Comment added successfully!' });
    } else {
      res.status(404).json({ message: 'Post not found.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
