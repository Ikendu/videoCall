import { createContext, useMemo } from "react";
import { io } from "socke.io-client"

const SockectContext = createContext(null);

function SockectProvider({ users }) {
    const socket = useMemo(()=>io('http://localhost:8000'),[])
  return <SockectContext.Provider value={}>{users}</SockectContext.Provider>;
}
export default SockectProvider;
