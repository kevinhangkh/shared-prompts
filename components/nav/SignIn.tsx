'use client';

import { BuiltInProviderType } from 'next-auth/providers/index';
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from 'next-auth/react';
import { useEffect, useState } from 'react';

function SignIn() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const getProvidersFromAuth = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    getProvidersFromAuth();
  }, []);

  return (
    <>
      {providers &&
        Object.values(providers)?.map((provider) => (
          <button
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="black_btn"
          >
            Sign In
          </button>
        ))}
    </>
  );
}

export default SignIn;
