import { Comment, Like } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export type NextAPIResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

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

export const TYPE_CHANGE: { [key: string]: number } = {
  OTHER_ROLE: 1,
  ADMIN: 2,
  DELETE: 3,
};

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

export type UserItem = {
  id: string;
  name: string | null;
  username: string | null;
  phone: string | null;
  email: string;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: string | null;
};

export type NotificationProps = {
  type: string;
  subjects: objectNoti[];
  diObj: objectNoti;
  inObj: objectNoti;
  prObj: objectNoti;
  subjectCount: number;
}

export type objectNoti = {
  id: string;
  type: string;
}