'use client';

import Profile from '@components/Profile';
import useFetchUserPosts from '@hooks/useFetchUserPosts';
import { Post } from '../../types/Post';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface MyProfileProps {}

function MyProfile({}: MyProfileProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { posts, loading } = useFetchUserPosts();

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  
  const handleDelete = () => {};

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      posts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
