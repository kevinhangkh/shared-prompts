/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useSession } from 'next-auth/react';
import { Post } from '../types/Post';
import { useEffect, useState } from 'react';

const useFetchUserPosts = (id = '') => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    setLoading(true);
    const userId = id ? id : session?.user.id;
    if (!userId) {
      // Prevent running API call if no user is specified
      // Happens when manually navigating to /profile while unauthenticated
      return;
    }
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
    fetchPosts();
  }, []);

  return { posts, setPosts, loading };
};

export default useFetchUserPosts;
