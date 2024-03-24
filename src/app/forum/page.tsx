"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

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
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const fetchPosts = async () => {
    const response = await fetch("../api/forum/forum");
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
      const initialInputs = data.reduce((acc: { [postId: string]: string }, post: Post) => {
        acc[post._id] = "";
        return acc;
      }, {});
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

    const response = await fetch(`../api/forum/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: "Current User", 
        content: commentContent,
      }),
    });

    if (response.ok) {
        setCommentInputs(prev => ({ ...prev, [postId]: "" }));
        fetchPosts(); 
      } else {
        console.error("Failed to add comment");
      }
}

  const handleUpvotes = async (postId: string) => {
    const response = await fetch(`../api/forum/${postId}/upvote`, {
      method: "POST",
    });

    if (response.ok) {
      fetchPosts(); // Refresh posts to show the updated vote count
    } else {
      console.error("Failed to upvote post");
    }
  };

  return (
    <div className="flex-1 p-4">
  <h1 className="text-2xl font-bold mb-4">Recovery Journey Forum</h1>
  {posts.length === 0 ? (
    <div className="text-center p-10 text-gray-500">No posts yet.</div>
  ) : (
    posts.map((post) => (
      <div key={post._id} className="bg-white p-4 rounded-lg shadow space-y-2 mb-4">
        <div className="font-bold">{post.user}</div>
        <p>{post.content}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleUpvotes(post._id)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Upvote {post.votes}
          </button>
        </div>
        <div>
          <input
            type="text"
            value={commentInputs[post._id] || ""}
            onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
            placeholder="Add a comment..."
            className="border p-2 rounded w-full"
          />
          <button
            onClick={() => handleAddComment(post._id)}
            className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Submit Comment
          </button>
        </div>
        {post.comments.length > 0 && (
          <div className="mt-4 space-y-2">
            {post.comments.map((comment) => (
              <div key={comment._id} className="bg-gray-100 p-2 rounded">
                <strong>{comment.user}: </strong>{comment.content}
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
