import { apiClient } from "@/lib/api";
import { useSession } from "next-auth/react";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {io as ClientIO} from "socket.io-client";

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
            const socketInstance = new (ClientIO as any)("localhost:3000"!, {
                path: "/api/socket/io",
                addTrailingSlash: false,
                auth: {user: {id: session?.user.uid, role: session?.user.role}},
            });
    
            socketInstance.on("connect", () => {
                setIsConnected(true);
            });
            socketInstance.on("disconnect", () => {
                setIsConnected(false);
            });
            
            // console.log(socketInstance, isConnected);
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