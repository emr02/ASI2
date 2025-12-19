import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function useBroadcast(wsUrl = "http://localhost:8090/ws") {
    const clientRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(wsUrl),
            debug: () => {},
            reconnectDelay: 3000,
            onConnect: () => {
                setConnected(true);
                client.subscribe("/cartes/notifications", (msg) =>
                    setMessages((prev) => [...prev, msg.body])
                );
            },
            onWebSocketClose: () => setConnected(false),
        });

        client.activate();
        clientRef.current = client;
        return () => client.deactivate();
    }, [wsUrl]);

    const send = (text) => {
        const c = clientRef.current;
        if (c && c.connected) {
            c.publish({ destination: "/app/sendMessage", body: text });
        }
    };

    return { connected, messages, send, clear: () => setMessages([]) }
}