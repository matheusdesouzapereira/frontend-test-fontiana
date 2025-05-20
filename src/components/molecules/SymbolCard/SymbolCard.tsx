import React from 'react';
import styles from './SymbolCard.module.scss';
import { Button } from '../../atoms/Button/Button';
import type { SymbolInfo } from '../../../utils/types';

interface SymbolCardProps {
  symbol: SymbolInfo;
  onAddToWatchlist: (symbol: string) => void;
  isInWatchlist: boolean;
}

export const SymbolCard: React.FC<SymbolCardProps> = ({ 
  symbol, 
  onAddToWatchlist, 
  isInWatchlist 
}) => {
  return (
    <div className={styles.symbolCard}>
      <div className={styles.symbolInfo}>
        <span className={styles.symbol}>{symbol.symbol}</span>
        <span className={styles.pair}>{symbol.baseAsset}/{symbol.quoteAsset}</span>
      </div>
      <Button
        variant={isInWatchlist ? 'secondary' : 'primary'}
        size="small"
        onClick={() => onAddToWatchlist(symbol.symbol)}
        disabled={isInWatchlist}
      >
        {isInWatchlist ? 'Added' : 'Add'}
      </Button>
    </div>
  );
};