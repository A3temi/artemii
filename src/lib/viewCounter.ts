const COUNTER_API_BASE = "https://api.counterapi.dev/v1";

export const VIEW_COUNTER_NAMESPACE = "artemii-portfolio";
export const VIEWS_PAGE_PASSWORD = "123";
export const VIEWS_AUTH_STORAGE_KEY = "portfolio-views-auth";
export const VIEW_TRACKED_SESSION_KEY = "portfolio-view-tracked";

const pad = (value: number) => value.toString().padStart(2, "0");

export const formatCounterDate = (date: Date) => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
};

export const getDailyViewKey = (date: Date) => `daily-${formatCounterDate(date)}`;

export const getCounterUrl = (key: string, action?: "up") =>
  `${COUNTER_API_BASE}/${VIEW_COUNTER_NAMESPACE}/${key}${action ? `/${action}` : ""}`;

export const getLastNDates = (days: number) => {
  const dates: Date[] = [];

  for (let index = days - 1; index >= 0; index -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);
    dates.push(date);
  }

  return dates;
};

export const isLocalHostname = (hostname: string) =>
  hostname === "localhost" || hostname === "127.0.0.1";

export const fetchCounterCount = async (key: string) => {
  const response = await fetch(getCounterUrl(key), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Counter request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { count?: number };
  return typeof data.count === "number" ? data.count : 0;
};
