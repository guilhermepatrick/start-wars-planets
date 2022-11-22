import React from 'react';
import './App.css';
import Planet from './context/PlanetsProvider';
import Home from './pages/Home';

function App() {
  return (
    <Planet>
      <Home />
    </Planet>
  );
}

export default App;
