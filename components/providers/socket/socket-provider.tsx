"use client";
import { apiClient } from "@/lib/api";
import { useSession } from "next-auth/react";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {io as ClientIO, Socket as SocketClient} from "socket.io-client";

type SocketContextType = {
    socket: any | null;
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
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const { data: session, status } = useSession();
    // const resSocket = await apiClient.get("/socket/io");
    useEffect(() => {
        if (status === "authenticated") {
            const socketInstance = new (ClientIO as any)(process.env.SOCKET_URL!, {
                path: "/api/socket/io",
                // addTrailingSlash: false,
                auth: {user: {id: session?.user.uid, role: session?.user.role}},
            });
            const socketClient: SocketClient = ClientIO(process.env.SOCKET_URL as string, {
                auth: {user: {id: session?.user.uid, role: session?.user.role}},
                withCredentials: true,
            })
            socketInstance.on("connect", () => {
                setIsConnected(true);
            });
            socketInstance.on("disconnect", () => {
                setIsConnected(false);
            });
            
            console.log(socketClient, isConnected);
            setSocket(socketInstance);
    
            return () => {
                socketInstance.disconnect();
            };
        }
    }, [status]);
    
    return (
        status === "authenticated" ? (
            <SocketContext.Provider value={{ socket, isConnected }}>
                {children}
            </SocketContext.Provider>
        ) : <>{children}</>
    );
    
    
}