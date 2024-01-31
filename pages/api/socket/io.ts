import { NextApiRequest } from "next";
import { NextAPIResponseServerIO } from "@/lib/constant";
import startSocketServer from "@/lib/socket/startSocketServer";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextAPIResponseServerIO) {
    try {
            startSocketServer(req, res);
    } catch (error: any){
        res.status(500).json({message: 'Socket cannot connect'});
    }
}