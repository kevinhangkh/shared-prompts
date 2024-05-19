'use client';

import Image from 'next/image';
import { Post } from '../../types/Post';
import { useState } from 'react';
import PromptCardHead from './PromptCardHead';
import PromptCardBody from './PromptCardBody';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface PromptCardProps {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
}

function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) {
  const { data: session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState<string>('');

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    // Reset the copy button to initial state after some time
    setTimeout(() => setCopied(''), 3000);
  };

  const postBelongsToCurrentUserAndProfilePage = () =>
    session?.user.id === post.creator._id && pathName === '/profile';

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <PromptCardHead post={post} />

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt={copied === post.prompt ? 'tick' : 'copy'}
            width={12}
            height={12}
          />
        </div>
      </div>

      <PromptCardBody post={post} handleTagClick={handleTagClick} />

      {postBelongsToCurrentUserAndProfilePage() && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <div className="copy_btn">
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={15}
              height={15}
              className="cursor-pointer"
              onClick={() => handleEdit && handleEdit(post)}
            />
          </div>
          <div className="copy_btn">
            <Image
              src="/assets/icons/trash.svg"
              alt="trash"
              width={18}
              height={18}
              className="cursor-pointer"
              onClick={() => handleDelete && handleDelete(post)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
