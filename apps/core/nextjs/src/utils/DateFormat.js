import { formatDistanceToNow } from "date-fns";

export const timeAgo = (date) => {
  const distance = formatDistanceToNow(date, { addSuffix: false });

  const match = distance.match(/(\d+)\s(\w+)/);
  if (!match) return distance;

  const [, value, unit] = match;

  const shortUnits = {
    second: "s",
    seconds: "s",
    minute: "m",
    minutes: "m",
    hour: "h",
    hours: "h",
    day: "d",
    days: "d",
    month: "mo",
    months: "mo",
    year: "y",
    years: "y",
  };

  return `${value}${shortUnits[unit] || unit}`;
};

export const formatDateByDash = (date) => date.toISOString().split("T")[0];
