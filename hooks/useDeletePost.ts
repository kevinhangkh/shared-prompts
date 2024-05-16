/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Post } from '../types/Post';
import { useState } from 'react';

const useDeletePost = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deletePost = async (post: Post) => {
    setLoading(true);
    try {
      await fetch(`/api/prompt/${post._id?.toString()}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading };
};

export default useDeletePost;
