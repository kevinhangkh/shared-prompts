'use client';

import Form from '@components/form/Form';
import { Post } from '../../types/Post';
import { useEffect, useState } from 'react';
import useFetchPostById from '@hooks/useFetchPostById';

interface UpdatePromptProps {}

function UpdatePrompt({}: UpdatePromptProps) {
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

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={() => {}}
    />
  );
}

export default UpdatePrompt;
