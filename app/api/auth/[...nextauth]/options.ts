import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
                  profile(profile) {
                    console.log("Profile GitHub: ", profile);
            
                    let userRole = "GitHub User";
                    if (profile?.email == "21020283@vnu.edu.vn") {
                      userRole = "admin";
                    }
            
                    return {
                      ...profile,
                      role: userRole,
                    };
                  },
                  clientId: process.env.GITHUB_ID ?? "",
                  clientSecret: process.env.GITHUB_SECRET ?? "",
                }),
        GoogleProvider({
            profile(profile) {
            console.log("Profile Google: ", profile);
    
            let userRole = "Google User";
            return {
                ...profile,
                id: profile.sub,
                role: userRole,
            };
            },
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: {
                type: "text",
                label: "email",
                placeholder: "your-email",
              },
              password: {
                type: "text",
                label: "password",
                placeholder: "your-password",
              },
            },
            async authorize(credentials) {
              try {
                const foundUser = await db.user.findUnique({
                  where:{ 
                      email: credentials?.email,
                  },
                });
                if(foundUser) {
                  console.log("Already exists");
                  const match = await bcrypt.compare(credentials?.password, foundUser.password);
                  if (match) {
                    console.log("Good pass");
                    foundUser['role'] = "Unverified Email";
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
    jwt({ token, user }) {
        if(user) token.role = user.role;
        return token;
    },
    session({ session, token }) {
        if (session?.user) session.user.role = token.role;
        return session;
    },
    },
};