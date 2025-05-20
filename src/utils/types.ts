export interface SymbolInfo {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  status: string;
}

export interface WebSocketData {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  p: string; // Price change
  P: string; // Price change percent
  c: string; // Last price
  b: string; // Best bid price
  a: string; // Best ask price
}

export interface WatchlistItem extends SymbolInfo {
  lastPrice?: string;
  bidPrice?: string;
  askPrice?: string;
  priceChangePercent?: string;
}

export interface BinanceApiResponse {
  symbols: {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    status: string;
  }[];
  timezone: string;
  serverTime: number;
}