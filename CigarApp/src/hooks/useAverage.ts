import { useEffect, useState } from "react";

export function useAverage(period = "week", records: Number) {
  const [average, setAverage] = useState(records);

  useEffect(() => {
    switch (period) {
      case "week":
        setAverage(Math.ceil(Number(records) / 7));
        break;
      case "month":
        setAverage(Math.ceil(Number(records) / 30));
        break;
      case "year":
        setAverage(Math.ceil(Number(records) / 365));
        break;
    }
  }, [period, records]);

  return average;
}
