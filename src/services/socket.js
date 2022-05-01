import openSocket, { io } from "socket.io-client";
import { SERVER_URL } from "./axios";

const socket = openSocket(SERVER_URL);
// const socket = io("ws://localhost:4500");

export default socket;
