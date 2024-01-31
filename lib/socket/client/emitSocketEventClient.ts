import { Socket } from "socket.io-client";

const emitSocketEventClient = (
  SocketClient: Socket | null,
  eventName: string,
  messageValue: any,
) => {
  if (SocketClient) {
    SocketClient.emit(eventName, messageValue);
  } else {
    console.log("Socket client not found!");
  }
};

export { emitSocketEventClient };
