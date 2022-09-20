import './App.css';
import React, { useEffect, useState } from 'react';
import SizeInclusivity from './components/sizeInclusivity';
import { getMostPopularSweaters, getPatternsById } from './services/ravelryApi';
import { PatternSearchResult } from './models/returnObjects';
import { PatternList } from './models/models';

function App() {

  //data is shared but analyzed differently
  // search patterns -> get ids, 
  // from those ids -> get full patterns

  async function getData() {
    const popularSweaters:PatternSearchResult = await getMostPopularSweaters();
    const ids = popularSweaters.patterns.map((x: PatternList) =>  x.id)
    console.log(await getPatternsById(ids))
  }

  useEffect(()=>{
    getData();
  })
  
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
