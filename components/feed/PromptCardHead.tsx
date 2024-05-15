import Image from 'next/image';

import { Post } from '../../types/Post';

interface PromptCardHeadProps {
  post: Post;
}

export default function PromptCardHead({ post }: PromptCardHeadProps) {
  return (
    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
      <Image
        src={post.creator.image}
        alt="user_image"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-gray-900">
          {post.creator.username}
        </h3>
        <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
      </div>
    </div>
  );
}
