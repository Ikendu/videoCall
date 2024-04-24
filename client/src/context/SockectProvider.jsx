/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SockectContext = createContext(null);

export function useSocket() {
  const socket = useContext(SockectContext);
  return socket;
}

export function SockectProvider({ children }) {
  const socket = useMemo(() => io("http://localhost:8000"), []);
  return (
    <SockectContext.Provider value={socket}>{children}</SockectContext.Provider>
  );
}
