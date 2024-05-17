'use client';

import Profile from '@components/Profile';
import useFetchUserPosts from '@hooks/useFetchUserPosts';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function UserProfile({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const { posts } = useFetchUserPosts(params?.id);

  useEffect(() => {
    if (session?.user.id === params?.id) {
      router.push('/profile');
    }
  }, [session?.user.id, params?.id]);

  return (
    <div>
      <Profile
        name={name || `unknown user`}
        desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
        posts={posts}
      />
    </div>
  );
}

export default UserProfile;
