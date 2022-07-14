import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
      },
      async authorize(credentials, _req) {
        const user = { id: 1, name: credentials?.name ?? "mrbanks" };
        return user;
      },
    }),
  ],
  // Configure other options
  callbacks: {
    jwt: async ({token, user}) => {
      if(user){
        token.id = user.id;
      }
      return token
    },
    session: async ({session, token,user}) => {
      if(user){
        session.id = user.id;
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET
  },

};

export default NextAuth(authOptions);
