import React from 'react';
import { BinanceProvider } from './contexts/BinanceProvider';
import { Home } from './pages/Home/Home';
import './assets/styles/index.scss';

const App: React.FC = () => {
  return (
    <BinanceProvider>
      <Home />
    </BinanceProvider>
  );
};

export default App;