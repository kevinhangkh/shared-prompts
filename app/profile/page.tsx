'use client';

import Profile from '@components/Profile';
import useFetchUserPosts from '@hooks/useFetchUserPosts';
import { Post } from '../../types/Post';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useDeletePost from '@hooks/useDeletePost';

interface MyProfileProps {}

function MyProfile({}: MyProfileProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { posts, setPosts } = useFetchUserPosts();
  const { deletePost } = useDeletePost();

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = (post: Post) => {
    // Ask for confirmation
    // TODO Make use of a modal popup
    const hasConfirmed = confirm('Are you sure to delete this prompt?');

    if (hasConfirmed) {
      const idToDelete = post._id?.toString();
      deletePost(post);
      const filteredPosts = posts.filter((post) => post._id !== idToDelete);
      setPosts(filteredPosts);
    }
  };

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
