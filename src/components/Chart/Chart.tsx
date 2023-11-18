import React, { useEffect, useState } from 'react';
import "./chart.scss"
import Plot from "react-plotly.js";

export default function Chart({ data }: any) {
  const [chartFeed, setChartFeed] = useState<any[]>([]);

  useEffect(() => {
    assignChartData();
  }, []);

  const assignChartData = async () => {
    const chartData = await extractData();
    setChartFeed(chartData);
    console.log(chartData);
  }

  function extractData() {
    const extractedData = data?.map(({ company_name, daily_review_count }: any) => ({
      name: company_name,
      type: 'scatter',
      mode: 'lines',
      x: daily_review_count?.map((item: any) => item.date),
      y: daily_review_count?.map((item: any) => item.positive_count || item.negative_count || item.maximum_reach)
    }));

    return extractedData;
  }

  return (
    <Plot
      data={
        chartFeed
      }
      layout={{ width: 500, height: 370 }}
    />
  )
}
