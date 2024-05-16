'use client';

import Form from '@components/form/Form';
import { Post } from '../../types/Post';
import { useEffect, useState } from 'react';
import useFetchPostById from '@hooks/useFetchPostById';
import { useRouter, useSearchParams } from 'next/navigation';

interface UpdatePromptProps {}

function UpdatePrompt({}: UpdatePromptProps) {
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const router = useRouter();

  const { post: fetchedPrompt, loading } = useFetchPostById();

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
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/profile');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
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
