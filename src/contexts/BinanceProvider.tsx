import React, { useState, useEffect } from 'react';
import { BinanceContext } from './BinanceContext';
import { getSymbols } from '../services/api';
import { useBinanceWebSocket } from '../hooks/useBinanceWebSocket';
import type { SymbolInfo, WatchlistItem } from '../utils/types';

export const BinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [symbols, setSymbols] = useState<SymbolInfo[]>([]);
  const [watchlists, setWatchlists] = useState<Record<string, WatchlistItem[]>>({
    'List 1': []
  });
  const [activeWatchlist, setActiveWatchlist] = useState<string>('List 1');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const allWatchlistSymbols = Object.values(watchlists).flatMap(list => 
    list.map(item => item.symbol)
  );
  const { priceData } = useBinanceWebSocket(allWatchlistSymbols);

  const fetchSymbols = async () => {
    try {
      setLoading(true);
      const data = await getSymbols();
      setSymbols(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch symbols');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = (symbol: string, listName: string = activeWatchlist) => {
    const symbolInfo = symbols.find(s => s.symbol === symbol);
    if (symbolInfo && !watchlists[listName]?.some(item => item.symbol === symbol)) {
      setWatchlists(prev => ({
        ...prev,
        [listName]: [...(prev[listName] || []), { ...symbolInfo }]
      }));
    }
  };

  const removeFromWatchlist = (symbol: string, listName: string = activeWatchlist) => {
    setWatchlists(prev => ({
      ...prev,
      [listName]: prev[listName].filter(item => item.symbol !== symbol)
    }));
  };

  const createNewWatchlist = (listName: string) => {
    if (!watchlists[listName]) {
      setWatchlists(prev => ({
        ...prev,
        [listName]: []
      }));
      setActiveWatchlist(listName);
      return true;
    }
    return false;
  };

  const selectWatchlist = (listName: string) => {
    if (watchlists[listName]) {
    setActiveWatchlist(listName);
  } else {
    console.warn(`Watchlist ${listName} does not exist`);
  }
  };

  useEffect(() => {
    if (priceData) {
      setWatchlists(prev => {
        const updatedLists: Record<string, WatchlistItem[]> = {};
        
        Object.entries(prev).forEach(([listName, items]) => {
          updatedLists[listName] = items.map(item => 
            item.symbol === priceData.s
              ? { 
                  ...item, 
                  lastPrice: priceData.c, 
                  bidPrice: priceData.b, 
                  askPrice: priceData.a, 
                  priceChangePercent: priceData.P 
                }
              : item
          );
        });

        return updatedLists;
      });
    }
  }, [priceData]);

  useEffect(() => {
    fetchSymbols();
  }, []);

  return (
    <BinanceContext.Provider
      value={{
        symbols,
        watchlists,
        activeWatchlist,
        loading,
        error,
        addToWatchlist,
        removeFromWatchlist,
        createNewWatchlist,
        selectWatchlist,
        fetchSymbols,
      }}
    >
      {children}
    </BinanceContext.Provider>
  );
};