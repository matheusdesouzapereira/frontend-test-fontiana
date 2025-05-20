import { useState } from 'react';
import { useBinance } from '../../contexts/BinanceContext';
import { SearchBar } from '../../components/molecules/SearchBar/SearchBar';
import { SymbolList } from '../../components/organisms/SymbolList/SymbolList';
import { Watchlist } from '../../components/organisms/Watchlist/Watchlist';
import { WatchlistPanel } from '../../components/organisms/WatchlistPanel/WatchlistPanel';
import styles from './Home.module.scss';
import logo from '../../assets/images/logo.png';

export const Home = () => {
  const { 
    symbols, 
    watchlists, 
    activeWatchlist, 
    loading, 
    error, 
    addToWatchlist, 
    removeFromWatchlist,
    createNewWatchlist,
    selectWatchlist
  } = useBinance();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSymbols = symbols.filter(symbol => 
    symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateList = () => {
    const newListName = `List ${Object.keys(watchlists).length + 1}`;
    createNewWatchlist(newListName);
  };

  const currentWatchlist = watchlists[activeWatchlist] || [];

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo}/>
        {error && <div className={styles.error}>{error}</div>}
        {loading && <div className={styles.loading}>Loading...</div>}
      </header>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <SymbolList 
            symbols={filteredSymbols} 
            onAddToWatchlist={(symbol) => addToWatchlist(symbol, activeWatchlist)} 
            watchlist={currentWatchlist.map(item => item.symbol)}
            loading={loading}
            error={error}
            onRetry={() => window.location.reload()}
          />
        </div>

        <div className={styles.rightPanel}>
          <WatchlistPanel
            watchlists={watchlists}
            activeList={activeWatchlist}
            onSelectList={selectWatchlist}
            onCreateList={handleCreateList}
          />
          <Watchlist 
            items={currentWatchlist} 
            onRemove={(symbol) => removeFromWatchlist(symbol, activeWatchlist)} 
          />
        </div>
      </div>
    </div>
  );
};