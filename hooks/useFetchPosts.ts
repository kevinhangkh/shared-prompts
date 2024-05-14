'use client';

import { Post } from '../types/Post';
import { useEffect, useState } from 'react';

const useFetchPosts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading };
};

export default useFetchPosts;
