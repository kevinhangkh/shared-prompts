'use client';

import Image from 'next/image';
import { Post } from '../types/Post';
import PromptCard from './feed/PromptCard';
import { useRouter } from 'next/navigation';

interface ProfileProps {
  name: string;
  desc: string;
  posts: Post[];
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
}

export default function Profile({
  name,
  desc,
  posts,
  handleEdit,
  handleDelete,
}: ProfileProps) {
  const router = useRouter();

  const handleClickCreate = () => {
    router.push('/create-prompt');
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/* // TODO refactor, comes from PromptCardList with different margintop */}
      <div className="mt-10 prompt_layout">
        {posts?.length ? (
          posts?.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <div className="desc text-left flex gap-2">
            You have no posts, start by creating one!
            <div className="copy_btn">
              <Image
                src="/assets/icons/create.svg"
                alt="create"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={handleClickCreate}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
