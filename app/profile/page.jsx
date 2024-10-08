"use client";

import { useSession } from "next-auth/react";
import {useState,useEffect} from 'react';
import { useRouter } from "next/navigation";
import PromptCard from "@components/PromptCard";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Add status to check if session is loading

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Only fetch if session is available and user is authenticated
    if (status === "authenticated" && session?.user?.id) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          if (!response.ok) throw new Error("Failed to fetch posts");
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      fetchPosts();
    }
  }, [session?.user?.id, status]); // Add status to the dependency array

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
