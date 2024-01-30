"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { SocketProvider } from "./socket-context";


export const queryClient = new QueryClient();


export const QuerySocketProvider = ({children}: {children: React.ReactNode}) => {
    
    return (
            <QueryClientProvider client={queryClient}>
                <SocketProvider>
                    {children}
                </SocketProvider>
            </QueryClientProvider>
    );
}