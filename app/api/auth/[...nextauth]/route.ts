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
  async session({ session }) {},
  async signIn({ profile }) {},
});

export { handler as GET, handler as POST };
