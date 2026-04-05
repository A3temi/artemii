"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  VIEWS_AUTH_STORAGE_KEY,
  VIEWS_PAGE_PASSWORD,
  fetchCounterCount,
  formatCounterDate,
  getDailyViewKey,
  getLastNDates,
  isLocalHostname,
} from "@/lib/viewCounter";

type DailyViewPoint = {
  date: string;
  label: string;
  count: number;
};

const ViewsPage = () => {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewData, setViewData] = useState<DailyViewPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsUnlocked(window.sessionStorage.getItem(VIEWS_AUTH_STORAGE_KEY) === "granted");
  }, []);

  useEffect(() => {
    if (!isUnlocked) {
      return;
    }

    let isCancelled = false;

    const loadViewData = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        if (typeof window !== "undefined" && isLocalHostname(window.location.hostname)) {
          setViewData(
            getLastNDates(30).map((date) => ({
              date: formatCounterDate(date),
              label: `${date.getMonth() + 1}/${date.getDate()}`,
              count: 0,
            }))
          );
          return;
        }

        const lastThirtyDays = getLastNDates(30);
        const counts = await Promise.all(
          lastThirtyDays.map(async (date) => {
            const count = await fetchCounterCount(getDailyViewKey(date));

            return {
              date: formatCounterDate(date),
              label: `${date.getMonth() + 1}/${date.getDate()}`,
              count,
            };
          })
        );

        if (!isCancelled) {
          setViewData(counts);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
          setLoadError("Could not load the last 30 days of views right now.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadViewData();

    return () => {
      isCancelled = true;
    };
  }, [isUnlocked]);

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === VIEWS_PAGE_PASSWORD) {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(VIEWS_AUTH_STORAGE_KEY, "granted");
      }

      setIsUnlocked(true);
      setPassword("");
      setErrorMessage("");
      return;
    }

    setErrorMessage("Wrong password.");
  };

  const totalViews = useMemo(
    () => viewData.reduce((sum, entry) => sum + entry.count, 0),
    [viewData]
  );

  const bestDay = useMemo(() => {
    if (viewData.length === 0) {
      return null;
    }

    return [...viewData].sort((left, right) => right.count - left.count)[0];
  }, [viewData]);

  const maxCount = useMemo(
    () => Math.max(...viewData.map((entry) => entry.count), 1),
    [viewData]
  );

  if (!isUnlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#2A272A] px-4 py-10 text-[#F8ECE4]">
        <div className="w-full max-w-md rounded-3xl border-[3px] border-[#FFF7D6] bg-[#2A272A] p-8 shadow-xl">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#FFEACF]">Private</p>
          <h1 className="mb-4 text-4xl font-bold text-[#FFF7D6]">Views Dashboard</h1>
          <p className="mb-6 text-sm leading-relaxed text-[#F8ECE4]/80">
            Enter the password to view the last 30 days of portfolio traffic.
          </p>

          <form className="space-y-4" onSubmit={handleUnlock}>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full rounded-2xl border-2 border-[#FFF7D6]/70 bg-transparent px-4 py-3 text-[#F8ECE4] outline-none transition focus:border-[#FFF7D6]"
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#FFF7D6] px-4 py-3 font-semibold text-[#2A272A] transition hover:bg-[#FFEACF]"
            >
              Unlock
            </button>
          </form>

          {errorMessage && (
            <p className="mt-4 text-sm text-[#FF8A8A]">{errorMessage}</p>
          )}

          <Link
            href="/"
            className="mt-6 inline-block text-sm text-[#FFEACF] underline transition hover:text-[#FFF7D6]"
          >
            Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#2A272A] px-4 py-8 text-[#F8ECE4] md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#FFEACF]">Analytics</p>
            <h1 className="text-4xl font-bold text-[#FFF7D6] md:text-5xl">Portfolio Views</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F8ECE4]/80">
              Daily visit counts for the last 30 days. The tracker skips `/views` and local development.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-full border border-[#FFF7D6] px-4 py-2 text-sm text-[#FFEACF] transition hover:bg-[#FFF7D6] hover:text-[#2A272A]"
          >
            Back to portfolio
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border-[3px] border-[#FFF7D6] bg-[#2A272A] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#FFEACF]">30-Day Total</p>
            <p className="mt-3 text-5xl font-bold text-[#FFF7D6]">{totalViews}</p>
          </div>

          <div className="rounded-3xl border-[3px] border-[#FFF7D6] bg-[#2A272A] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#FFEACF]">Best Day</p>
            <p className="mt-3 text-3xl font-bold text-[#FFF7D6]">
              {bestDay ? `${bestDay.count} on ${bestDay.label}` : "No data yet"}
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border-[3px] border-[#FFF7D6] bg-[#2A272A] p-4 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-[#FFF7D6]">Last 30 Days</h2>
            {isLoading && <span className="text-sm text-[#FFEACF]">Loading...</span>}
          </div>

          {loadError ? (
            <p className="text-sm text-[#FF8A8A]">{loadError}</p>
          ) : (
            <div className="no-scrollbar overflow-x-auto pb-2">
              <div className="flex min-w-[900px] items-end gap-3">
                {viewData.map((entry, index) => {
                  const heightPercent = entry.count === 0 ? 3 : Math.max((entry.count / maxCount) * 100, 8);
                  const showLabel = index % 3 === 0 || index === viewData.length - 1;

                  return (
                    <div key={entry.date} className="flex flex-1 flex-col items-center gap-3">
                      <span className="text-xs text-[#FFEACF]">{entry.count}</span>
                      <div className="flex h-64 w-full items-end rounded-full bg-[#FFF7D6]/6 px-1 py-2">
                        <div
                          className="w-full rounded-full bg-gradient-to-t from-[#FFF7D6] via-[#FFEACF] to-[#FFB86B] transition-all duration-500"
                          style={{ height: `${heightPercent}%` }}
                          title={`${entry.label}: ${entry.count} views`}
                        />
                      </div>
                      <span className={`text-xs ${showLabel ? "text-[#F8ECE4]" : "text-transparent"}`}>
                        {entry.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ViewsPage;
