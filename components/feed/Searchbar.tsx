'use client';

import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Post } from '../../types/Post';
import useDebounce from '@hooks/useDebounce';

interface Props {
  posts: Post[];
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  setSearchResults: Dispatch<SetStateAction<Post[]>>;
}

function Searchbar({
  posts,
  searchText,
  setSearchText,
  setSearchResults,
}: Props) {
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

  useEffect(() => {
    if (searchText) {
      debouncedSearch(searchText);
    }
  }, [searchText]);

  return (
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
  );
}

export default Searchbar;
