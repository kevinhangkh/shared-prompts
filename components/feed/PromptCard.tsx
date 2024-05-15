'use client';

import Image from 'next/image';
import { Post } from '../../types/Post';
import { useState } from 'react';
import PromptCardHead from './PromptCardHead';
import PromptCardBody from './PromptCardBody';

interface PromptCardProps {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
}

function PromptCard({ post, handleTagClick }: PromptCardProps) {
  const [copied, setCopied] = useState<string>('');

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    // Reset the copy button to initial state after some time
    setTimeout(() => setCopied(''), 3000);
  };

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
    </div>
  );
}

export default PromptCard;
