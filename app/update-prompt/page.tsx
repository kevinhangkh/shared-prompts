'use client';

import Form from '@components/form/Form';
import { Post } from '../../types/Post';
import { FormEvent, useEffect, useState } from 'react';
import useFetchPostById from '@hooks/useFetchPostById';
import { useRouter } from 'next/navigation';
import useUpdatePost from '@hooks/useUpdatePost';

interface UpdatePromptProps {}

function UpdatePrompt({}: UpdatePromptProps) {
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

  const updatePrompt = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
