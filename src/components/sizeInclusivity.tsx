import React from "react";
import { getSweaters } from "../services/ravelryApi";

export default function SizeInclusivity(){

    
    getData();
    return(
        <p>size info</p>
    )
}

function getData(){
    const sweaterData = getSweaters();
    console.log(sweaterData)
}