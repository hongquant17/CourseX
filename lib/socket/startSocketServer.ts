import { NextAPIResponseServerIO } from "@/lib/constant";
import { db } from "@/lib/db";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { Server as ServerIO, Socket } from "socket.io";
import { eventSub } from "./eventSub";


type NextApiRequestWithPayload = NextApiRequest & { user?: { id: string } };
export type SocketType = Socket & {
    user?: {
      id: string;
      role: string | null;
    };
  };
export default function startSocketServer(req: NextApiRequest, res: NextAPIResponseServerIO) {
    try {        
        if (!res.socket.server.io) {
            const path = "/api/socket/io";
            const httpServer: NetServer = res.socket.server as any;
            const io = new ServerIO(httpServer, {
                path: path,
                pingTimeout: 60000,
                cors: {
                    origin: process.env.SOCKET_URL as string,
                    credentials: true,
                },
            });
            res.socket.server.io = io;

            initializeSocketIO(req, res);
            res.status(200).json({message: "Socket connected"});
        };
    } catch (error: any){
        res.status(500).json({message: 'Socket cannot connect'});
    }
}

export const initializeSocketIO = (
    _req: NextApiRequestWithPayload,
    res: NextAPIResponseServerIO,
) => {
    const io: ServerIO = res.socket.server.io;
    return io.on("connection", async (socket: SocketType) => {
        try {
            const credentials = socket.handshake.auth.user;

            if (!credentials) {
                throw new ApiError(401, "Unauthorized handshare. Invalid credentials");
            }

            const user = await db.user.findUnique({
                where: {
                    id: credentials.id,
                },
                select: {
                    id: true,
                    role: true,
                }
            });
            if (!user) {
                throw new ApiError(401, "Un-authorized handshake. Invalid Credentials");
            }
            
            socket.user = user;
            socket.join(user.id);
            console.log("User connected 🗼. userId: ", user.id, socket.id);

            eventSub(socket, "like:comment", "like:noti");

            socket.on("disconnect", () => {
                console.log("User has disconnected. userId: ", user.id);
                if (socket.user?.id) {
                    socket.leave(socket.user.id);
                }
            });
        } catch (error) {
            socket.emit("socketError", (error as Error).message || "Something wrong while connect to socket");
        }
    })
}