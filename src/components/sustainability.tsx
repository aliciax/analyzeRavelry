import { useSelector } from "react-redux";
import {  selectPopularSweaters } from "../state/dataReducer";

export function Sustainability () {
  const popularSweaterData = useSelector(selectPopularSweaters);
  //console.log(popularSweaterData)
  
  return <p>Sustainability!</p>;
};

