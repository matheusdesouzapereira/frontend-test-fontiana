import { useEffect, useState } from 'react';
import type { WebSocketData } from '../utils/types';

export const useBinanceWebSocket = (symbols: string[]) => {
  const [priceData, setPriceData] = useState<WebSocketData | null>(null);

  useEffect(() => {
    if (symbols.length === 0) return;

    const streams = symbols.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
    const socket = new WebSocket(`wss://data-stream.binance.com/stream?streams=${streams}`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.data) {
        setPriceData(data.data);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [symbols]);

  return { priceData };
};