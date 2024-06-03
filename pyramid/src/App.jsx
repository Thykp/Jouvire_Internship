import React from 'react';
import Board from './components/Board';
import './index.css';

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Board />
    </div>
  );
};

export default App;
