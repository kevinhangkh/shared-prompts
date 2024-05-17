'use client';

import { useState, useEffect, ChangeEvent } from 'react';

import useFetchPosts from '@hooks/useFetchPosts';
import PromptCardList from './PromptCardList';
import { Post } from '../../types/Post';
import Searchbar from './Searchbar';
import Image from 'next/image';

function Feed() {
  const { posts, loading } = useFetchPosts();

  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  useEffect(() => {
    if (posts) {
      setSearchResults([...posts]);
    }
  }, [posts]);

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  };

  return (
    <section className="feed">
      <Searchbar
        posts={posts}
        searchText={searchText}
        setSearchText={setSearchText}
        setSearchResults={setSearchResults}
      />

      {loading ? (
        <div className='mt-16'>
          <Image
            src="/assets/icons/loader.svg"
            alt="loading"
            width={70}
            height={50}
          />
        </div>
      ) : (
        <PromptCardList
          posts={searchText ? searchResults : posts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
}

export default Feed;
