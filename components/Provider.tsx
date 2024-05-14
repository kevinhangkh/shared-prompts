'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProviderProps {
  session?: any;
  children?: ReactNode;
}

function Provider({ session, children }: ProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
