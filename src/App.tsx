import "./App.css";
import { useEffect, useState } from "react";
import SizeInclusivity from "./components/sizeInclusivity";
import {
  fetchPopularSweaters,
} from "./state/dataReducer";
import { useAppDispatch } from "./state/store";
import Sustainability from "./components/sustainability";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPopularSweaters());
  });

  return (
    <div>
      <header>Analyzing Knitting and Crochet through Ravelry</header>
      <SizeInclusivity />
      <Sustainability />
    </div>
  );
}

export default App;
