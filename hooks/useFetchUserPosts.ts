/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useSession } from 'next-auth/react';
import { Post } from '../types/Post';
import { useEffect, useState } from 'react';

const useFetchUserPosts = (id = '') => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const userId = id ? id : session?.user.id;
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
    if (status === 'authenticated') {
      fetchPosts();
    }
  }, [status]);

  return { posts, setPosts, loading };
};

export default useFetchUserPosts;
