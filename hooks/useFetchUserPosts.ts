/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Post } from '../types/Post';
import { useEffect, useState } from 'react';

interface useFetchUserPostsProps {
  userId: string;
}

const useFetchUserPosts = (props: useFetchUserPostsProps) => {
  const { userId } = props || {};
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  return { posts, loading };
};

export default useFetchUserPosts;
