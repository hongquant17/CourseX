import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { NextAPIResponseServerIO } from "@/lib/constant";


export default async function handler(req: NextApiRequest, res: NextAPIResponseServerIO) {
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
            res.status(200).json({message: "Socket connected"});
        }
        // res.socket.server.io.on("like:comment", (message) => {
        //     console.log("Received");
        //     res.socket.server.io.emit("like:noti", message.message);
        // });
        res.socket.server.io.emit("test", {message: "test"});
        // console.log(res.socket.server.io);
        res.end();
    } catch (error: any){
        res.status(500).json({message: 'Socket cannot connect'});
    }
}