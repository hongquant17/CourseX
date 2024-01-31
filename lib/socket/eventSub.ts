import { SocketType } from "./startSocketServer";

export const eventSub = (
    socket: SocketType | null,
    eventName: string,
    clientEventName: string,
) => {
    if (socket) {
        socket.on(eventName, (messageValue: {userId: string, message: string}) => {
            socket.to(messageValue.userId).emit(clientEventName, messageValue.message);
        });
    }
}