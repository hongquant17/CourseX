import type { Server } from "socket.io";

const emitSocketEvent = (
  io: Server,
  eventName: string,
  roomId: string,
  messageValue: JSON | null
) => {
  io.to(roomId).emit(eventName, messageValue);
};

export { emitSocketEvent };
