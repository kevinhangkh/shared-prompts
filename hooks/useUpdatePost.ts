/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Post } from '../types/Post';
import { useState } from 'react';

const useUpdatePost = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updatePost = async (post: Post) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/prompt/${post._id?.toString()}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { updatePost, loading };
};

export default useUpdatePost;
