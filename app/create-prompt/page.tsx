'use client';

import Form from '@components/form/Form';
import { useState } from 'react';

function CreatePrompt() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (event) => {};

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}

export default CreatePrompt;
