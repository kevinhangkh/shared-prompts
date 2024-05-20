import NextAuth from 'next-auth';

declare module 'next-auth' {
  // Extend the default session object to include the user id
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  // Extend the default profile object to include the user profile
  interface Profile extends DefaultProfile {
    picture?: string | null;
  }
}
