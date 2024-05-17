import Image from 'next/image';

import { Post } from '../../types/Post';
import { useRouter } from 'next/navigation';

interface PromptCardHeadProps {
  post: Post;
}

export default function PromptCardHead({ post }: PromptCardHeadProps) {
  const router = useRouter();

  const handleClickUser = () => {
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="flex-1 flex justify-start items-center gap-3">
      <Image
        src={post.creator.image}
        alt="user_image"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />

      <div className="flex flex-col">
        <h3
          className="font-satoshi font-semibold text-gray-900 cursor-pointer"
          onClick={handleClickUser}
        >
          {post.creator.username}
        </h3>
        <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
      </div>
    </div>
  );
}
