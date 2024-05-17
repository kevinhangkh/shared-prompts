'use client';

import { useState, useEffect, ChangeEvent } from 'react';

import useFetchPosts from '@hooks/useFetchPosts';
import PromptCardList from './PromptCardList';
import { Post } from '../../types/Post';
import useDebounce from '@hooks/useDebounce';
import Searchbar from './Searchbar';

function Feed() {
  const { posts, loading } = useFetchPosts();

  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  useEffect(() => {
    if (posts) {
      setSearchResults([...posts]);
    }
  }, [posts]);

  return (
    <section className="feed">
      <Searchbar
        posts={posts}
        searchText={searchText}
        setSearchText={setSearchText}
        setSearchResults={setSearchResults}
      />

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
