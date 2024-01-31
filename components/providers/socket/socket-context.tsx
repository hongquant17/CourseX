import { useSession } from "next-auth/react";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {io as ClientIO, Socket as SocketClientIO} from "socket.io-client";
import { toast } from "sonner";

type SocketContextType = {
    socket: SocketClientIO | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({children}: {children: React.ReactNode}) => {
    const [socket, setSocket] = useState<SocketClientIO | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { data: session, status } = useSession();
    
    useEffect(() => {
        if (status === "authenticated") {
            const path = "/api/socket/io";
            const socketClient: SocketClientIO = ClientIO(process.env.SOCKET_URL as string, {
                path: path,
                auth: {user: {id: session?.user.uid, role: session?.user.role}},
                withCredentials: true,
            })
            socketClient.on("connect", () => {
                setIsConnected(true);
            });
            socketClient.on("disconnect", () => {
                setIsConnected(false);
            });

            setSocket(socketClient);

            socketClient.on("like:noti", (message) => {
                toast(message);
            });

            return () => {
                socketClient.disconnect();
            };
        }
    }, [session?.user.role, session?.user.uid, status]);
    
    return (
        status === "authenticated" ? (
            <SocketContext.Provider value={{ socket, isConnected }}>
                {children}
            </SocketContext.Provider>
        ) : <>{children}</>
    );
    
    
}