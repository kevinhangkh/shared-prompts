'use client';

import { useState, useEffect, ChangeEvent } from 'react';

import useFetchPosts from '@hooks/useFetchPosts';
import PromptCardList from './PromptCardList';
import { Post } from '../../types/Post';

function Feed() {
  const { posts, loading } = useFetchPosts();

  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    clearTimeout(searchTimeout); // Clears the timeout

    setSearchTimeout(
      setTimeout(() => {
        const result = filterPosts(e.target.value);
        setSearchResults(result);
      }, 1000)
    );
  };

  const filterPosts = (searchText: string): Post[] => {
    const regex = new RegExp(searchText, 'i'); // i flag for case-insensitive search
    return [...posts].filter((post) => {
      return (
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
      );
    });
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a username or a tag"
          value={searchText}
          onChange={handleChangeSearch}
          required
          className="search_input peer"
        />
      </form>

      {loading ? (
        <div>{`Loading...`}</div>
      ) : (
        <PromptCardList
          posts={searchText ? searchResults : posts}
          handleTagClick={() => {}}
        />
      )}
    </section>
  );
}

export default Feed;
