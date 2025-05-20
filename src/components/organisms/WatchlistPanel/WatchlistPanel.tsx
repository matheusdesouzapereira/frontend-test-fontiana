import styles from './WatchlistPanel.module.scss';
import type { WatchlistItem } from '../../../utils/types';

interface WatchlistPanelProps {
  watchlists: {
    [key: string]: WatchlistItem[];
  };
  activeList: string;
  onSelectList: (list: string) => void;
  onCreateList: () => void;
}

export const WatchlistPanel: React.FC<WatchlistPanelProps> = ({ 
  watchlists, 
  activeList, 
  onSelectList,
  onCreateList 
}) => {
  return (
    <div className={styles.watchlistPanel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Your Watchlists</h3>
        <button 
          onClick={onCreateList}
          className={styles.addButton}
        >
          + New List
        </button>
      </div>
      
      <div className={styles.list}>
        {Object.keys(watchlists).map((listName) => (
          <button
            key={listName}
            className={`${styles.listItem} ${activeList === listName ? styles.active : ''}`}
            onClick={() => onSelectList(listName)}
          >
            {listName}
          </button>
        ))}
      </div>
    </div>
  );
};