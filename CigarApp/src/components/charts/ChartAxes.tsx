import React from "react";
import { Line, Text as SvgText } from "react-native-svg";

type ChartAxesProps = {
  chartLeft: number;
  chartTop: number;
  chartBottom: number;
  chartWidth: number;
  chartAreaHeight: number;
  maxCount: number;
  borderColor: string;
  textColor: string;
};

export default function ChartAxes({
  chartLeft,
  chartTop,
  chartWidth,
  chartAreaHeight,
  maxCount,
  borderColor,
  textColor,
}: ChartAxesProps) {
  return (
    <>
      {[0, 1, 2, 3].map((index) => {
        const y = chartTop + (chartAreaHeight / 3) * index;
        const value = Math.ceil(maxCount * (1 - index / 3));

        return (
          <React.Fragment key={index}>
            <Line
              x1={chartLeft}
              y1={y}
              x2={chartWidth - 8}
              y2={y}
              stroke={borderColor}
              strokeWidth={1}
            />

            <SvgText
              x={chartLeft - 8}
              y={y + 4}
              fill={textColor}
              fontSize={10}
              textAnchor="end"
            >
              {value}
            </SvgText>
          </React.Fragment>
        );
      })}
    </>
  );
}
