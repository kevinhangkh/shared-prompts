'use client';

import { useState, useEffect, ChangeEvent } from 'react';

import useFetchPosts from '@hooks/useFetchPosts';
import PromptCardList from './PromptCardList';
import { Post } from '../../types/Post';
import useDebounce from '@hooks/useDebounce';

function Feed() {
  const { posts, loading } = useFetchPosts();

  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  useEffect(() => {
    if (posts) {
      setSearchResults([...posts]);
    }
  }, [posts]);

  const filterPosts = (searchText: string): void => {
    const regex = new RegExp(searchText, 'i'); // i flag for case-insensitive search
    const result = [...posts].filter((post) => {
      return (
        regex.test(post.creator.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
      );
    });
    setSearchResults(result);
  };

  const debouncedSearch = useDebounce(filterPosts, 1000);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
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
