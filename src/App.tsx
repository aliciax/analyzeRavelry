import './App.css';
import React, { useState } from 'react';
import { getSweaters } from './services/ravelryApi';
import SizeInclusivity from './components/sizeInclusivity';

function App() {
  return (
    <div >
      <header >
       Analyzing Knitting and Crochet through Ravelry
      </header>
      <SizeInclusivity />
    </div>
  );
}

export default App;
