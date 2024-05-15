'use client';

import Profile from '@components/Profile';
import useFetchUserPosts from '@hooks/useFetchUserPosts';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MyProfileProps {}

function MyProfile({}: MyProfileProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  // const [userId, setUserId] = useState<string>('');

  // useEffect(() => {
  //   if (status !== 'loading' && session?.user?.id) {
  //     console.log('here', session?.user?.id)
  //     setUserId(session?.user?.id);
  //   }
  // }, [status, session?.user?.id]);

  const { posts, loading } = useFetchUserPosts();

  const handleEdit = () => {};
  const handleDelete = () => {};

  // if (!session) {
  //   console.log(session);
  //   console.log(posts);

  //   router.push('/');
  //   return;
  // }
  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

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
