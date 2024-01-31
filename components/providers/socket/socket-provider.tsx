"use client";
import { SocketProvider } from "./socket-context";


export const QuerySocketProvider = ({children}: {children: React.ReactNode}) => {
    
    return (
        <SocketProvider>
            {children}
        </SocketProvider>
    );
}