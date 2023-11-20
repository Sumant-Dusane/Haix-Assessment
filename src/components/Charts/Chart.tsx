import { Data } from 'plotly.js';
import React, { useEffect, useState } from 'react';
import Plot from "react-plotly.js";

export default function Chart({ data, type }: any) {
  const [chartFeed, setChartFeed] = useState<any[]>([]);

  useEffect(() => {
    assignChartData();
  }, [chartFeed.length, data.length, type]);

  const assignChartData = async () => {
    const chartData = await extractData();
    setChartFeed(chartData);
  }

  function extractData() {
    const extractedData = data?.map(({ company_name, daily_review_count }: any) => ({
      name: company_name,
      type: type === 'line' ? 'scatter' : 'bar',
      mode: 'lines',
      x: daily_review_count?.map((item: any) => item.date),
      y: daily_review_count?.map((item: any) => item.positive_count || item.negative_count || item.maximum_reach)
    }));

    return extractedData;
  }

  return (
    <Plot
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
      layout={{
        autosize: true,
        hovermode: false,
        // xaxis: {
        //   showgrid: false
        // },
        // yaxis: {
        //   showgrid: false
        // },
        transition: { ordering: 'traces first', easing: 'sin-out', 'duration': 100 }
      }}
      data={
        chartFeed
      }
    />
  )
}
