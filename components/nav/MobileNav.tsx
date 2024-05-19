'use client';

import Image from 'next/image';
import Link from 'next/link';

import SignIn from './SignIn';
import { Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';

interface MobileNavProps {
  toggleDropdown: boolean;
  setToggleDropdown: Dispatch<SetStateAction<boolean>>;
  signOut(): void;
}

function MobileNav({
  toggleDropdown,
  setToggleDropdown,
  signOut,
}: MobileNavProps) {
  const { data: session } = useSession();
  const isUserLoggedIn: boolean = !!session?.user;

  return (
    <div className="sm:hidden flex relative">
      {isUserLoggedIn ? (
        <div className="flex">
          <Image
            src={session?.user?.image?.toString()}
            width={37}
            height={37}
            className="rounder-full cursor-pointer"
            alt="profile"
            onClick={() => setToggleDropdown((prev) => !prev)}
          />
          {toggleDropdown && (
            <div className="dropdown shadow-lg">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link
                href="/create-prompt"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button
                type="button"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className="mt-5 w-full black_btn"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default MobileNav;
