import "./App.css";
import { useEffect, useState } from "react";
import {
  fetchCurrentTopSweaters,
  fetchPopularSweaters,
} from "./state/dataReducer";
import { useAppDispatch } from "./state/store";
import { SizeInclusivity } from "./components/sizeInclusivity";
import { Sustainability } from "./components/sustainability";
import { Pivot, PivotItem } from "@fluentui/react";
import "./config/styles.css";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPopularSweaters());
    dispatch(fetchCurrentTopSweaters());
  });

  return (
    <div>
      <header>Analyzing Knitting and Crochet through Ravelry</header>
      <p>filler words</p>
      <Pivot aria-label="Basic Pivot Example">
        <PivotItem headerText="Size Inclusivity">
          <SizeInclusivity />
        </PivotItem>
        <PivotItem headerText="Sustainability">
          <Sustainability />
        </PivotItem>
      </Pivot>
    </div>
  );
}

export default App;
