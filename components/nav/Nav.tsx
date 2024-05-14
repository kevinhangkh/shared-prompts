'use client'; // Client side component because we're using react hooks

import Link from 'next/link'; // To navigate to other pages
import Image from 'next/image'; // To optimize images
import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react'; // For authentication
import DesktopNav from './DesktopNav';
import SignIn from './SignIn';
import MobileNav from './MobileNav';

function Nav() {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

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
      <DesktopNav signOut={signOut} />

      {/* Mobile navigation */}
      <MobileNav
        toggleDropdown={toggleDropdown}
        setToggleDropdown={setToggleDropdown}
        signOut={signOut}
      />
    </nav>
  );
}

export default Nav;
