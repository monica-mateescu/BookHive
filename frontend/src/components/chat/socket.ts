import { API_URL } from "@config";
import { Socket, io } from "socket.io-client";

export const socket: Socket = io(API_URL, {
  autoConnect: false,
  withCredentials: true,
});
