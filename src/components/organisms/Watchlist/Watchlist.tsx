import styles from './Watchlist.module.scss';
import type { WatchlistItem } from '../../../utils/types';

interface WatchlistProps {
  items: WatchlistItem[];
  onRemove: (symbol: string) => void;
}

export const Watchlist: React.FC<WatchlistProps> = ({ items, onRemove }) => {
  return (
    <div className={styles.watchlist}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>Bid Price</th>
            <th>Ask Price</th>
            <th>Price Change (%)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyMessage}>
                No symbols in watchlist. Add some!
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.symbol}>
                <td>
                  <div className={styles.symbol}>
                    {item.symbol}
                    <span className={styles.pair}>{item.baseAsset}/{item.quoteAsset}</span>
                  </div>
                </td>
                <td>{item.lastPrice || '-'}</td>
                <td>{item.bidPrice || '-'}</td>
                <td>{item.askPrice || '-'}</td>
                <td className={`${styles.change} ${
                  item.priceChangePercent?.startsWith('-') ? styles.negative : styles.positive
                }`}>
                  {item.priceChangePercent ? `${item.priceChangePercent}%` : '-'}
                </td>
                <td>
                  <button 
                    onClick={() => onRemove(item.symbol)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};