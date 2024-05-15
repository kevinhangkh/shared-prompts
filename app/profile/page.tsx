'use client';

import Profile from '@components/Profile';
import useFetchUserPosts from '@hooks/useFetchUserPosts';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface MyProfileProps {}

function MyProfile({}: MyProfileProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const { posts, loading } = useFetchUserPosts(session?.user?.id);

  const handleEdit = () => {};
  const handleDelete = () => {};

  if (!session) {
    console.log(session);
    console.log(posts);

    router.push('/');
    return;
  }

  return (
    <Profile
      name="My"
      desc=""
      posts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
