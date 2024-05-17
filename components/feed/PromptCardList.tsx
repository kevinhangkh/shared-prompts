'use client';

import { Post } from '../../types/Post';
import PromptCard from './PromptCard';

interface PromptCardListProps {
  posts: Post[];
  handleTagClick(tag: string): void;
}

function PromptCardList({ posts, handleTagClick }: PromptCardListProps) {
  return (
    <div className="mt-16 prompt_layout">
      {posts?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

export default PromptCardList;
