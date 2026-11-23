import React from "react";
import { Rect, Text as SvgText } from "react-native-svg";

type ChartBarItem = {
  date: Date;
  count: number;
};

type ChartBarsProps = {
  chartValues: ChartBarItem[];
  chartLeft: number;
  chartTop: number;
  chartBottom: number;
  chartAreaHeight: number;
  step: number;
  barWidth: number;
  maxCount: number;
  period: "week" | "month" | "year";
  barColor: string;
  textColor: string;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
};

export default function ChartBars({
  chartValues,
  chartLeft,
  chartTop,
  chartBottom,
  chartAreaHeight,
  step,
  barWidth,
  maxCount,
  period,
  barColor,
  textColor,
  selectedDate,
  onSelectDate,
}: ChartBarsProps) {
  return (
    <>
      {chartValues.map((item, index) => {
        const dateKey = item.date.toISOString();
        const isSelected = selectedDate === dateKey;

        const barHeight = (item.count / maxCount) * chartAreaHeight;

        const x = chartLeft + index * step + (step - barWidth) / 2;

        const y = chartBottom - barHeight;

        const showLabel =
          period === "week" ||
          index % (period === "month" ? 5 : 30) === 0 ||
          index === chartValues.length - 1;

        const bubbleWidth = 42;
        const bubbleHeight = 24;
        const bubbleX = x + barWidth / 2 - bubbleWidth / 2;
        const bubbleY = Math.max(1, y - 30);
        const selectedBarColor = "#f7d59a";
        const bubbleColor = "#F59E0B";

        return (
          <React.Fragment key={dateKey}>
            <Rect
              x={x}
              y={y}
              width={barWidth}
              height={Math.max(1, barHeight)}
              rx={3}
              fill={isSelected ? selectedBarColor : barColor}
              onPress={() => onSelectDate(dateKey)}
            />

            {isSelected && (
              <>
                <Rect
                  x={bubbleX}
                  y={bubbleY}
                  width={bubbleWidth}
                  height={bubbleHeight}
                  rx={7}
                  fill={bubbleColor}
                />

                <SvgText
                  x={bubbleX + bubbleWidth / 2}
                  y={bubbleY + 16}
                  fill="#FFFFFF"
                  fontSize={12}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {item.count}
                </SvgText>
              </>
            )}

            {showLabel && (
              <SvgText
                x={x + barWidth / 2}
                y={chartBottom + 18}
                fill={textColor}
                fontSize={10}
                textAnchor="middle"
              >
                {`${item.date.getDate()}/${item.date.getMonth() + 1}`}
              </SvgText>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
