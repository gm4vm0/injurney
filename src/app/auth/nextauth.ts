import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
  ],
  // Add custom pages for sign in, sign out, error, verify request, etc if needed
  pages: {
    signIn: '/auth/signin',
  },
  // Define database options here if you want to keep sessions in the database
  // database: process.env.DATABASE_URL,
  
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This is default
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
        session.user.id = token.id as string; 
        return session;
    },
  },
});
