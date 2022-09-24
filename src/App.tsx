import "./App.css";
import { useEffect } from "react";
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
      <span className="dot"></span>
      <section className="mainHeader">
        <h1 className="headerStyle ">
          Analyzing Knitting and Crochet through Ravelry
        </h1>
        <p className="topText">
          This project was created to take a look into crafting by analyzing
          data on Ravelry. Ravelry is one, if not the biggest platform for
          crochet and knitting. It has an active userbase that serves to be a
          good source of data to see if there is any trends in size inclusivity
          and sustainability.
        </p>
      </section>

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
