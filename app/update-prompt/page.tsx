'use client';

import Form from '@components/form/Form';
import { Post } from '../../types/Post';
import { useEffect, useState } from 'react';
import useFetchPostById from '@hooks/useFetchPostById';
import { useRouter, useSearchParams } from 'next/navigation';
import useUpdatePost from '@hooks/useUpdatePost';

interface UpdatePromptProps {}

function UpdatePrompt({}: UpdatePromptProps) {
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const router = useRouter();

  const { post: fetchedPrompt, loading } = useFetchPostById();
  const { updatePost, loading: loadingUpdate } = useUpdatePost();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    if (fetchedPrompt) {
      setPost(fetchedPrompt);
    }
  }, [fetchedPrompt]);

  const updatePrompt = async (event): Promise<void> => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await updatePost(post);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      router.push('/profile');
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}

export default UpdatePrompt;
