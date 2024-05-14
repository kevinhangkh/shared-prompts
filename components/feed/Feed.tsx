'use client';

import { useState, useEffect, ChangeEvent } from 'react';

import useFetchPosts from '@hooks/useFetchPosts';
import PromptCardList from './PromptCardList';

function Feed() {
  const { posts, loading } = useFetchPosts();

  const [searchText, setSearchText] = useState<string>('');

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
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
        <PromptCardList posts={posts} handleTagClick={() => {}} />
      )}
    </section>
  );
}

export default Feed;
