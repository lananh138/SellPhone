import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { convertPriceDataChart } from "../../utils";

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width={900} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 50,
          bottom: 5,
        }}
        barSize={14}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis tickFormatter={convertPriceDataChart} />
        <Tooltip formatter={(value) => convertPriceDataChart(value)} />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="doanhthu"
          name={"Doanh Thu"}
          fill="#00a7ff"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
