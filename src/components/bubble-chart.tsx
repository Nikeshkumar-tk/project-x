import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const BubbleChart = ({ data }: any) => {
  const parseDomain = () => [
    0,
    Math.max(
      Math.max.apply(
        null,
        data.map((entry: any) => entry.date)
      )
    )
  ];

  const renderTooltip = (props: any) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #999",
            margin: 0,
            padding: 10
          }}
        >
          <p>{`${data.name} - ${data.date}`}</p>
          <p>
            <span>Date: </span>
            {data.date}
          </p>
        </div>
      );
    }

    return null;
  };

  const domain = parseDomain();
  const range = [6, 125];

  return (
    <ResponsiveContainer className="flex justify-center p-2" width="100%" height={200}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <XAxis
          dataKey="name"
          interval={0}
          tick={{ fontSize: 12 }}
          tickLine={{ transform: "translate(0, -6)" }}
          label={{ value: "Name", position: "insideBottom", offset: -10 }}
        />
        <YAxis
          dataKey="date"
          name="date"
          height={80}
          width={80}
          tick={false}
          tickLine={false}
          axisLine={false}
          label={{ value: "Date", position: "insideRight" }}
        />
        <ZAxis type="number" dataKey="date" domain={domain} range={range} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          wrapperStyle={{ zIndex: 100 }}
          content={renderTooltip}
        />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default BubbleChart;
