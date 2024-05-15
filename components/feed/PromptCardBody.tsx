import React from 'react';
import { Post } from '../../types/Post';

interface PromptCardBodyProps {
  post: Post;
  handleTagClick?: (tag: string) => void;
}

function PromptCardBody({ post, handleTagClick }: PromptCardBodyProps) {
  return (
    <>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </>
  );
}

export default PromptCardBody;
