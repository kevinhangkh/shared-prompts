import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

// Ensure GOOGLE_ID and GOOGLE_CLIENT_SECRET are defined
if (!process.env.GOOGLE_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_ID or GOOGLE_CLIENT_SECRET is not defined');
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Get the current user
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if user already exists
        const userExists = await User.findOne({
          email: profile?.email,
        });

        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(/\s/g, '').toLowerCase(),
            image: profile?.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
