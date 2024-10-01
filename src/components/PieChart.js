"use client";
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function BasicPie() {
  // Use media queries to determine the current screen size
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMediumScreen = useMediaQuery('(min-width: 601px) and (max-width: 960px)');

  // Set width and height based on screen size
  const chartWidth = isSmallScreen ? 300 : isMediumScreen ? 400 : 450;
  const chartHeight = isSmallScreen ? 200 : 250;

  return (
    <div className="w-full flex justify-center">
      <PieChart className="shadow-md rounded-md overflow-x-auto"
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={chartWidth}
        height={chartHeight}
      />
    </div>
  );
}
