export const isAdmin = (userId?: string | null) => {
  return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
};
