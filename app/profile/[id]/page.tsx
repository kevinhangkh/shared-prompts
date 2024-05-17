'use client';

import Profile from '@components/Profile';
import useFetchUserPosts from '@hooks/useFetchUserPosts';
import { useSearchParams } from 'next/navigation';

function UserProfile({ params }) {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const { posts } = useFetchUserPosts(params?.id);

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
