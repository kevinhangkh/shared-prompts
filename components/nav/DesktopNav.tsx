'use client';

import Image from 'next/image';
import Link from 'next/link';
import SignIn from './SignIn';
import { useSession } from 'next-auth/react';

interface DesktopNavProps {
  signOut(): void;
}

function DesktopNav({ signOut }: DesktopNavProps) {

  const { data: session } = useSession();
  const isUserLoggedIn: boolean = !!session?.user;

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
              src={session?.user?.image?.toString()}
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
