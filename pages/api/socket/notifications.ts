import { NextApiRequest } from "next";
import { NextAPIResponseServerIO } from "@/lib/constant";
import startSocketServer from "@/lib/socket/startSocketServer";


export default async function handler(req: NextApiRequest, res: NextAPIResponseServerIO) {
    try {        
        startSocketServer(req, res);
        res.socket.server.io.emit("like:noti");
        res.end();
    } catch (error: any){
        res.status(500).json({message: 'Socket cannot connect'});
    }
}