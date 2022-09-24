import { dataPoint } from "../models/dataSetModels";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Layer,
  Rectangle,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#EE6E62", "#0F7173", "#D8A47F", "#6D6875", "#727D71"];

export function createChart(
  data: dataPoint[],
  height: number,
  width: number,
  radius: number
) {
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
    <div className="">
      <PieChart width={width} height={height}>
        <Legend layout="horizontal" verticalAlign="top" align="center" />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={radius}
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

export function createBarChart(data: any) {
  return (
    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Fiber" fill="#82ca9d" />
    </BarChart>
  );
}

// function twoPie() {
//   const data01 = [
//     { name: "Group A", value: 400 },
//     { name: "Group B", value: 300 },
//     { name: "Group C", value: 300 },
//     { name: "Group D", value: 200 },
//   ];
//   const data02 = [
//     { name: "A1", value: 100 },
//     { name: "A2", value: 300 },
//     { name: "B1", value: 100 },
//     { name: "B2", value: 80 },
//     { name: "B3", value: 40 },
//     { name: "B4", value: 30 },
//     { name: "B5", value: 50 },
//     { name: "C1", value: 100 },
//     { name: "C2", value: 200 },
//     { name: "D1", value: 150 },
//     { name: "D2", value: 50 },
//   ];

//   return (
//       <PieChart width={700} height={700}>
//         <Pie
//           data={data01}
//           dataKey="value"
//           cx="50%"
//           cy="50%"
//           outerRadius={60}
//           fill="#8884d8"
//           label
//         />
//         <Pie
//           data={data02}
//           dataKey="value"
//           cx="50%"
//           cy="50%"
//           innerRadius={110}
//           outerRadius={170}
//           fill="#82ca9d"
//           label
//         />
//       </PieChart>
//   );
// }
