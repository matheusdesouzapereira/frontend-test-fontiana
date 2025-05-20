import { createContext, useContext } from 'react';
import type { SymbolInfo, WatchlistItem } from '../utils/types';

interface BinanceContextType {
  symbols: SymbolInfo[];
  watchlists: Record<string, WatchlistItem[]>;
  activeWatchlist: string;
  loading: boolean;
  error: string | null;
  addToWatchlist: (symbol: string, listName?: string) => void;
  removeFromWatchlist: (symbol: string, listName?: string) => void;
  createNewWatchlist: (listName: string) => boolean;
  selectWatchlist: (listName: string) => void;
  fetchSymbols: () => Promise<void>;
}

export const BinanceContext = createContext<BinanceContextType | undefined>(undefined);

export const useBinance = () => {
  const context = useContext(BinanceContext);
  if (context === undefined) {
    throw new Error('useBinance must be used within a BinanceProvider');
  }
  return context;
};