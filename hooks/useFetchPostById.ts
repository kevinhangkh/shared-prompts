'use client';

import { useSearchParams } from 'next/navigation';
import { Post } from '../types/Post';
import { useEffect, useState } from 'react';

const useFetchPostById = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post>();

  const fetchPostById = async () => {
    setLoading(true);
    try {
      console.log('here', promptId);
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (promptId) {
      fetchPostById();
    }
  }, [promptId]);

  return { post, loading };
};

export default useFetchPostById;
