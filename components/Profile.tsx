'use client';

import { Post } from '../types/Post';
import PromptCard from './feed/PromptCard';

interface ProfileProps {
  name: string;
  desc: string;
  posts: Post[];
  handleEdit(post: Post): void;
  handleDelete(post: Post): void;
}

export default function Profile({
  name,
  desc,
  posts,
  handleEdit,
  handleDelete,
}: ProfileProps) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/* // TODO refactor, comes from PromptCardList with different margintop */}
      <div className="mt-10 prompt_layout">
        {posts?.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}
