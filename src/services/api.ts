import type { SymbolInfo, BinanceApiResponse } from '../utils/types';

export const getSymbols = async (): Promise<SymbolInfo[]> => {
  const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
  
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data: BinanceApiResponse = await response.json();
  
  return data.symbols.map((symbol): SymbolInfo => ({
    symbol: symbol.symbol,
    baseAsset: symbol.baseAsset,
    quoteAsset: symbol.quoteAsset,
    status: symbol.status
  }));
};