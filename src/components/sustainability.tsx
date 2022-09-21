import { useSelector } from "react-redux";
import {  selectPopularSweaters } from "../state/dataReducer";

const Sustainability = () => {
  const popularSweaterData = useSelector(selectPopularSweaters);
  console.log(popularSweaterData)
  
  return <p>Sustainability!</p>;
};

export default Sustainability;
