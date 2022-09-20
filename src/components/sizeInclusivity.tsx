import React, { useEffect, useState } from "react";
import { getMostPopularSweaters, getPatternsById } from "../services/ravelryApi";

const SizeInclusivity = () => {
  const [sweaterData, setSweaterData] = useState();

  async function getData() {
    //console.log(await getMostPopularSweaters());
    //console.log(await getPatternsById())
  }

  useEffect(()=>{
    getData();
  })

  return <p></p>;
};

export default SizeInclusivity;
