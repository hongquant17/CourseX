import { Comment, Like } from "@prisma/client";

export const ROLES: { [key: string]: string } = {
    TEACHER: "3",
    USER: "2",
    ADMIN: "1",
    NOT_ADMIN: "0",
  };

  export const PRIVILEGES: { [key: string]: number } = {
    ADMIN: 0,
    OTHERS: 2,
  };

  export const TYPE_CHANGE: {[key: string]: number} = {
    OTHER_ROLE: 1,
    ADMIN: 2,
    DELETE: 3,
  }

  export type CommentItem = Comment & {
    id: string; 
    content: string;
    parentId: string | null;
    userId: string;
    courseId: string;
    createdAt: Date; 
    updatedAt: Date; 
    isDeleted: boolean;
    likes: Like[];
    userName: string | null;
    userAvatar: string | null;
    userRole: string | null;
    courseOwner: string;
};