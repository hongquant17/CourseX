import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
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