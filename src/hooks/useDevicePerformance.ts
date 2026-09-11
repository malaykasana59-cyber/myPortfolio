"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

interface DevicePerformance {
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  isTouchDevice: boolean;
}

const emptySubscribe = () => () => {};

const serverSnapshot: { isLowEnd: boolean; isTouchDevice: boolean } = {
  isLowEnd: false,
  isTouchDevice: false,
};

let clientSnapshot: { isLowEnd: boolean; isTouchDevice: boolean } | null = null;

function getPerformanceSnapshot(): { isLowEnd: boolean; isTouchDevice: boolean } {
  if (typeof window === "undefined") {
    return serverSnapshot;
  }
  if (!clientSnapshot) {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const isLowMemory = nav.deviceMemory !== undefined && nav.deviceMemory <= 2;
    const isLowCpu =
      nav.deviceMemory === undefined &&
      typeof nav.hardwareConcurrency === "number" &&
      nav.hardwareConcurrency <= 4;
    clientSnapshot = {
      isLowEnd: Boolean(isLowMemory || isLowCpu),
      isTouchDevice: Boolean(hasTouch),
    };
  }
  return clientSnapshot;
}

export function useDevicePerformance(): DevicePerformance {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { isLowEnd, isTouchDevice } = useSyncExternalStore(
    emptySubscribe,
    getPerformanceSnapshot,
    () => serverSnapshot
  );

  return {
    isLowEnd,
    prefersReducedMotion,
    isTouchDevice,
  };
}
