import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { NextAPIResponseServerIO } from "@/lib/constant";
import { ApiError } from "next/dist/server/api-utils";
import { db } from "@/lib/db";

type NextApiRequestWithPayload = NextApiRequest & { user?: { id: string } };
type SocketType = Socket & {
    user?: {
      id: string;
      role: string | null;
    };
  };
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextAPIResponseServerIO) {
    try {        
        if (!res.socket.server.io) {
            const path = "/api/socket/io";
            const httpServer: NetServer = res.socket.server as any;
            const io = new ServerIO(httpServer, {
                path: path,
                pingTimeout: 60000,
                cors: {
                    origin: "http://localhost:3000",
                    credentials: true,
                },
            });
            res.socket.server.io = io;

            initializeSocketIO(req, res);
            res.status(200).json({message: "Socket connected"});
        }
        // console.log(res.socket.server.io);
        // res.end();
    } catch (error: any){
        res.status(500).json({message: 'Socket cannot connect'});
    }
}

const initializeSocketIO = (
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
            socket.emit("connected");
            console.log("User connected 🗼. userId: ", user.id);


            socket.on("disconnect", () => {
                console.log("User has disconnected. userId: ");
                if (socket.user?.id) {
                    socket.leave(socket.user.id);
                }
            });
        } catch (error) {
            socket.emit("socketError", (error as Error).message || "Something wrong while connect to socket");
        }
    })
}