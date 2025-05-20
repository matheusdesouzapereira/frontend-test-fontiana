import { useEffect, useState } from 'react';
import { getSymbols } from '../services/api';
import type { SymbolInfo } from '../utils/types';

export const useSymbols = () => {
  const [symbols, setSymbols] = useState<SymbolInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchSymbols();
  }, []);

  return { symbols, loading, error, fetchSymbols };
};