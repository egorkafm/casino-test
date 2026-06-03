import type { WsEvent } from "@/lib/types/ws";

export type WsEventListener = (event: WsEvent) => void;

interface SocketClient {
  connect(): void;
  disconnect(): void;
  subscribe(listener: WsEventListener): () => void;
}

const RECONNECT_DELAY_MS = 2_000;

export function createSocketClient(url: string): SocketClient {
  let socket: WebSocket | null = null;
  let manuallyClosed = false;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  const listeners = new Set<WsEventListener>();

  function open() {
    if (typeof window === "undefined") return;
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
      return;
    }
    socket = new WebSocket(url);
    socket.addEventListener("message", (event) => {
      if (typeof event.data !== "string") return;
      let parsed: WsEvent;
      try {
        parsed = JSON.parse(event.data) as WsEvent;
      } catch {
        return;
      }
      for (const listener of listeners) listener(parsed);
    });
    socket.addEventListener("close", () => {
      if (manuallyClosed) return;
      scheduleReconnect();
    });
    socket.addEventListener("error", () => {
      socket?.close();
    });
  }

  function scheduleReconnect() {
    if (reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      open();
    }, RECONNECT_DELAY_MS);
  }

  return {
    connect() {
      manuallyClosed = false;
      open();
    },
    disconnect() {
      manuallyClosed = true;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      socket?.close();
      socket = null;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
