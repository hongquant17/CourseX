import { getSession } from "./auth";

interface Session {
  user: {
    name: string,
    email: string,
    image: string,
    role: string,
    uid: string,
  }
}

export const isAdmin = (userId?: string | null, session?: Session) => {
  if (session) {
    return session.user.role === 'admin';
  }
  
  return userId === process.env.NEXT_PUBLIC_ADMIN_ID;
};
