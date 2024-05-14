'use client';

import { Post } from '../../types/Post';
import Link from 'next/link';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface FormProps {
  type: string;
  post: Post;
  setPost: Dispatch<SetStateAction<{ prompt: string; tag: string }>>;
  submitting: boolean;
  handleSubmit(event: any): Promise<void>;
}

function Form({ type, post, setPost, submitting, handleSubmit }: FormProps) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: e.target.value });
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>

          <textarea
            name="prompt"
            value={post.prompt}
            onChange={handleChange}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-satoshi font-normal">
              (#product, #webdev, #picture, ...)
            </span>
          </span>

          <input
            name="tag"
            value={post.tag}
            onChange={handleChange}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
