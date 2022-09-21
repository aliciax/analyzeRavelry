import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMostPopularSweaters, getPatternsById } from "../services/ravelryApi";
import { fetchPopularSweaters, selectPopularSweaters } from "../state/dataReducer";

const SizeInclusivity = () => {
  const popularSweaterData = useSelector(selectPopularSweaters);
  console.log(popularSweaterData)
  

  //Questions answering
  //what kind of sizing is there
  //difference between knitting and crochet
  
  return <p>I'm here!</p>;
};

export default SizeInclusivity;
