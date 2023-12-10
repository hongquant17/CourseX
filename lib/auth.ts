import { NextAuthOptions, getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import brcypt from "bcrypt"

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log(profile)
        return {
          id: profile.id,
          email: profile.email,
          name: profile.login,
          image: profile.avatar_url,
          role: profile.role ?? "user",
        };
      },
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      profile(profile) {
        console.log(profile)
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.family_name + " " + profile.given_name,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "your-email",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await db.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (foundUser) {
            console.log("Already exists");
            // const match = await brcypt.compare(credentials?.password!, foundUser.password);
            if (true) {
              console.log("Good pass");
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      }
    }),
  ], 
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.uid = token.id;
      };
      return session;
    },
  },
  session: {
    strategy: 'jwt'
  }
};

export async function getSession() {
  return await getServerSession(options)
}