import clientPromise from "@/utils/mongodb";

// Fetch all posts
export async function GET(request: Request) {
  const db = (await clientPromise).db("injurney");

  const posts = await db.collection("forumPosts").find({}).toArray();
  return Response.json(posts);
}

export async function POST(request: Request) {
  const db = (await clientPromise).db("injurney");
  const { user, content } = request.body as any;

  const result = await db.collection("forumPosts").insertOne({
    user,
    content,
    votes: 0,
    comments: [],
    createdAt: new Date(),
  });
  return Response.json(result.ops[0]);
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//         const db = (await clientPromise).db("injurney");

//         const posts = await db.collection("forumPosts").find({}).toArray();
//         res.status(200).json(posts);
//     } else if (req.method === 'POST') {
//         const db = (await clientPromise).db("injurney");
//         const { user, content } = req.body;

//         const result = await db.collection("forumPosts").insertOne({
//             user,
//             content,
//             votes: 0,
//             comments: [],
//             createdAt: new Date()
//         });

//         res.status(201).json(result.ops[0]);
//     } else {
//         res.setHeader('Allow', ['GET', 'POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
