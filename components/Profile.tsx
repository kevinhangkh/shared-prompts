'use client';

import { Post } from '../types/Post';

interface ProfileProps {
  name: string;
  desc: string;
  posts: Post[];
  handleEdit(): void;
  handleDelete(): void;
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
      <h1 className="head_text text-left">{name} Profile</h1>
    </section>
  );
}
