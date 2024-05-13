'use client';

import Image from 'next/image';
import Link from 'next/link';
import SignIn from './SignIn';

interface DesktopNavProps {
  isUserLoggedIn: boolean;
  signOut(): void;
}

function DesktopNav({ isUserLoggedIn, signOut }: DesktopNavProps) {
  return (
    <div className="sm:flex hidden">
      {isUserLoggedIn ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Prompt
          </Link>

          <button type="button" onClick={() => signOut} className="outline_btn">
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
        <SignIn />
      )}
    </div>
  );
}

export default DesktopNav;
