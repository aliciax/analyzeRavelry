import { dataPoint } from "../models/dataSetModels";
import { PieChart, Pie, Legend, Cell } from "recharts";

const COLORS = ["#EE6E62", "#0F7173", "#D8A47F", "#6D6875", "#727D71"];

export function createChart(data: dataPoint[]) {
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
