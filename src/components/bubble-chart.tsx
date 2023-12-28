import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
  

const BubbleChart = ({data}:any) => {
    
const parseDomain = () => [
    0,
    Math.max(
      Math.max.apply(
        null,
        data.map((entry:any) => entry.value)
      ),
    )
  ];
  
  const renderTooltip = (props: any) => {
    const { active, payload } = props;
  
    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;
  
      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #999",
            margin: 0,
            padding: 10
          }}
        >
          <p>{data.name}</p>
          <p>
            <span>name: </span>
            {data.name}
          </p>
        </div>
      );
    }
  
    return null;
  };
  const domain = parseDomain();
  const range = [16, 225];
  
  return (
    <ResponsiveContainer width="100%" height={60}>
     <ScatterChart
        width={800}
        height={60}
        margin={{
          top: 10,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <XAxis
          type="category"
          dataKey="hour"
          interval={0}
          tick={{ fontSize: 0 }}
          tickLine={{ transform: "translate(0, -6)" }}
        />
        <YAxis
          type="number"
          dataKey="index"
          name="sunday"
          height={10}
          width={80}
          tick={false}
          tickLine={false}
          axisLine={false}
          label={{ value: "Sunday", position: "insideRight" }}
        />
        <ZAxis type="number" dataKey="value" domain={domain} range={range} />
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