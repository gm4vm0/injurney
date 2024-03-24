"use client";

import { Lato } from "next/font/google";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const latoNormal = Lato({ subsets: ["latin"], weight: "400" });

interface Post {
  _id: string;
  user: string;
  content: string;
  votes: number;
  comments: Comment[];
}

interface Comment {
  _id: string;
  user: string;
  content: string;
}

export const Forum = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentInputs, setCommentInputs] = useState<{
    [postId: string]: string;
  }>({});

  const fetchPosts = async () => {
    const response = await fetch("/api/forum");
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
      const initialInputs = data.reduce(
        (acc: { [postId: string]: string }, post: Post) => {
          acc[post._id] = "";
          return acc;
        },
        {}
      );
      setCommentInputs(initialInputs);
    } else {
      console.error("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddComment = async (postId: string) => {
    const commentContent = commentInputs[postId];
    if (!commentContent) return;

    const response = await fetch(`/api/forum/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: "Current User",
        content: commentContent,
      }),
    });

    if (response.ok) {
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } else {
      console.error("Failed to add comment");
    }
  };

  const handleUpvotes = async (postId: string) => {
    const response = await fetch(`/api/forum/${postId}/upvote`, {
      method: "POST",
    });

    if (response.ok) {
      fetchPosts(); // Refresh posts to show the updated vote count
    } else {
      console.error("Failed to upvote post");
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setPosts([
      ...posts,
      {
        _id: "abc",
        user: "You",
        content: event.target.content.value,
        votes: 0,
        comments: [],
      },
    ]);
    console.log(posts);
  };

  return (
    <div
      className={`${latoNormal.className} text-highlight flex flex-col items-start p-16 gap-10`}
    > 
    <Navbar />
      <h1 className="text-4xl font-bold">Recovery Journey Forum</h1>
      <div className="w-full p-6 bg-highlight text-darkgreen rounded-3xl">
        <h3 className="w-full text-2xl font-bold">Write a post.</h3>
        <form>
          <input
            type="text"
            placeholder="Start typing here."
            name="content"
            className="w-full mt-2 bg-transparent text-neutral-700 placeholder:text-xl focus:outline-none"
          ></input>
          <input
            type="submit"
            value="Post"
            onSubmit={handleSubmit}
            className="w-full p-2 mt-2 text-lg rounded-lg bg-darkgreen text-highlight"
          ></input>
        </form>
      </div>
      {posts.length === 0 ? (
        <div className="text-center text-gray-500">No posts yet.</div>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="py-4 mb-4 space-y-2 bg-white rounded-lg shadow"
          >
            <div className="font-bold">{post.user}</div>
            <p>{post.content}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleUpvotes(post._id)}
                className="p-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
              >
                Upvote {post.votes}
              </button>
            </div>
            <div>
              <input
                type="text"
                value={commentInputs[post._id] || ""}
                onChange={(e) =>
                  setCommentInputs({
                    ...commentInputs,
                    [post._id]: e.target.value,
                  })
                }
                placeholder="Add a comment..."
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => handleAddComment(post._id)}
                className="p-2 mt-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
              >
                Submit Comment
              </button>
            </div>
            {post.comments.length > 0 && (
              <div className="mt-4 space-y-2">
                {post.comments.map((comment) => (
                  <div key={comment._id} className="p-2 bg-gray-100 rounded">
                    <strong>{comment.user}: </strong>
                    {comment.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Forum;
