import styles from './SymbolList.module.scss';
import { SymbolCard } from '../../molecules/SymbolCard/SymbolCard';
import type { SymbolInfo } from '../../../utils/types';

interface SymbolListProps {
  symbols: SymbolInfo[];
  onAddToWatchlist: (symbol: string) => void;
  watchlist: string[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const SymbolList: React.FC<SymbolListProps> = ({ 
  symbols, 
  onAddToWatchlist, 
  watchlist,
  loading = false,
  error = null,
  onRetry = () => {}
}) => {
  if (loading) {
    return <div className={styles.loading}>Loading symbols...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.symbolList}>
      <h3 className={styles.title}>Symbol</h3>
      <div className={styles.list}>
        {symbols.map((symbol) => (
          <SymbolCard
            key={symbol.symbol}
            symbol={symbol}
            onAddToWatchlist={onAddToWatchlist}
            isInWatchlist={watchlist.includes(symbol.symbol)}
          />
        ))}
      </div>
    </div>
  );
};