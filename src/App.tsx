import "./App.css";
import { useEffect, useState } from "react";
import { fetchPopularSweaters } from "./state/dataReducer";
import { useAppDispatch } from "./state/store";
import { SizeInclusivity } from "./components/sizeInclusivity";
import { Sustainability } from "./components/sustainability";
import { Label, Pivot, PivotItem } from "@fluentui/react";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPopularSweaters());
  });

  return (
    <div>
      <header>Analyzing Knitting and Crochet through Ravelry</header>
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
