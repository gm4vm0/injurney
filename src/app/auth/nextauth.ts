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
  pages: {
    signIn: '/auth/signin',
  },
  // Define database options here if you want to keep sessions in the database
  
  session: {

    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
        session.user.id = token.id as string; 
        return session;
    },
  },
});
