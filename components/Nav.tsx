'use client'; // Client side component because we're using react hooks

import Link from 'next/link'; // To navigate to other pages
import Image from 'next/image'; // To optimize images
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'; // For authentication

function Nav() {
  const isUserLoggedIn = false;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>

            <Link href="/profile" className="">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounder-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}

export default Nav;
