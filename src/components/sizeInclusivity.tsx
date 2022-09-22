import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { sizeDataSet } from "../models/dataSetModels";
import { PatternFull } from "../models/models";
import { selectPopularSweaters } from "../state/dataReducer";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";

const LetterFilter: RegExp = /L|XL/;
const LetterRegex: RegExp = /XXL|2XL|2X|4XL|5XL/;
const NumberRegex: RegExp = /”|"|cm|in|inches/;
const NotesRegex: RegExp = /(1 \(2)|notes/;
const COLORS = ["#EE6E62", "#0F7173", "#D8A47F", "#6D6875"];

export function SizeInclusivity() {
  const popularSweaterData: PatternFull[] = useSelector(selectPopularSweaters);

  useEffect(() => {
    if (popularSweaterData) {
      extractSizeDataSet(popularSweaterData);
    }
  });

  //Questions answering
  //what kind of sizing is there
  //difference between knitting and crochet

  return (
    <div className="ms-Grid">
      <div className="ms-Grid-row">Sizing types</div>
      <div className="ms-Grid-row">{createChart()}</div>
    </div>
  );
}

function extractSizeDataSet(data: PatternFull[]) {
  var dataSet: sizeDataSet = {
    crochet: 0,
    knitting: 0,
    letterSizing: 0,
    numberSizes: 0,
    sizingNotes: 0,
    straightSizeOnly: 0,
    irregular: 0,
  };

  data.forEach((x) => {
    if (x.craft.id === 1) {
      dataSet.crochet++;
    } else {
      dataSet.knitting++;
    }

    if (x.sizes_available.match(LetterFilter)) {
      x.sizes_available.match(LetterRegex)
        ? dataSet.letterSizing++
        : dataSet.straightSizeOnly++;
    } else if (x.sizes_available.match(NumberRegex) != null) {
      dataSet.numberSizes++;
    } else if (x.sizes_available.match(NotesRegex)) {
      dataSet.sizingNotes++;
    } else {
      dataSet.irregular++;
    }
  });
  return dataSet;
}

function createChart() {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const RADIAN = Math.PI / 180;
  function renderCustomizedLabel({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: any;
    cy: any;
    midAngle: any;
    innerRadius: any;
    outerRadius: any;
    percent: any;
    index: any;
  }) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  return (
    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
      <PieChart width={600} height={600}>
        <Legend layout="horizontal" verticalAlign="top" align="center" />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={230}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
