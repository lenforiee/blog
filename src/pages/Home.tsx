import { Alert, Typography } from "@mui/material";
import { Post } from "../models/Post";
import PostPreview from "../components/PostPreview";
import { useEffect, useState } from "react";
import { fetchPosts } from "../adapters/posts";
import Loading from "../components/Loading";

export default function Home() {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPosts();
      if (posts === null) {
        setError("Failed to fetch posts from API.");
        return;
      }

      setPosts(posts);
    }

    fetchData().catch((reason) => {
      setError("Failed to fetch posts from API.");
      console.error(reason);
    });
  }, []);

  if (error) {
    return <>
      <br />
      <Alert severity="error">{error}</Alert>
    </>;
  }

  if (posts === null) {
    return <Loading loadingText="Loading posts..." />;
  }

  if (posts.length === 0) {
    return <Loading loadingText="No posts to display" />;
  }

  return (
    <>
      {posts.map(post => <PostPreview post={post} />)}
    </>
  );
}