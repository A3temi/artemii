"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  VIEW_TRACKED_SESSION_KEY,
  getCounterUrl,
  getDailyViewKey,
  isLocalHostname,
} from "@/lib/viewCounter";

const ViewTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/views")) {
      return;
    }

    if (typeof window === "undefined" || isLocalHostname(window.location.hostname)) {
      return;
    }

    const todayKey = `${VIEW_TRACKED_SESSION_KEY}:${new Date().toISOString().slice(0, 10)}`;

    if (window.sessionStorage.getItem(todayKey)) {
      return;
    }

    window.sessionStorage.setItem(todayKey, "1");

    void fetch(getCounterUrl(getDailyViewKey(new Date()), "up"), {
      method: "GET",
      cache: "no-store",
    }).catch((error) => {
      console.error("Unable to record portfolio view", error);
    });
  }, [pathname]);

  return null;
};

export default ViewTracker;
