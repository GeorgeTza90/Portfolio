import type { SmokingRecord } from "@/storage/smoking-records";

export type Period = "week" | "month" | "year";

export type ChartValue = {
  date: Date;
  count: number;
};

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("el-GR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("el-GR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getPeriodDays(period: Period): Date[] {
  const today = new Date();
  const days: Date[] = [];

  if (period === "week") {
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      days.push(date);
    }
  } else {
    const firstDay =
      period === "month"
        ? new Date(today.getFullYear(), today.getMonth(), 1)
        : new Date(today.getFullYear(), 0, 1);

    for (
      let date = new Date(firstDay);
      date <= today;
      date.setDate(date.getDate() + 1)
    ) {
      days.push(new Date(date));
    }
  }

  return days;
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function filterRecordsByPeriod(
  records: SmokingRecord[],
  period: Period,
): SmokingRecord[] {
  const now = new Date();

  return records.filter((record) => {
    const recordDate = new Date(record.createdAt);

    if (period === "week") {
      const start = new Date(now);
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);

      return recordDate >= start && recordDate <= now;
    }

    if (period === "month") {
      return (
        recordDate.getFullYear() === now.getFullYear() &&
        recordDate.getMonth() === now.getMonth()
      );
    }

    return recordDate.getFullYear() === now.getFullYear();
  });
}

export function getChartValues(
  days: Date[],
  records: SmokingRecord[],
): ChartValue[] {
  return days.map((day) => ({
    date: day,
    count: records.filter((record) => sameDay(new Date(record.createdAt), day))
      .length,
  }));
}

export function getPeriodLabel(period: Period): string {
  switch (period) {
    case "week":
      return "Τελευταίες 7 ημέρες";
    case "month":
      return "Τρέχων μήνας";
    case "year":
      return "Τρέχον έτος";
  }
}
