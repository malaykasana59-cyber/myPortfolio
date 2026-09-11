"use client";

import { useEffect, RefObject } from "react";

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean
) {
  useEffect(() => {
    if (!active || !ref.current) return;

    const el = ref.current;
    const focusableSelectors =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusableElements = () =>
      Array.from(el.querySelectorAll<HTMLElement>(focusableSelectors));

    // Focus first element on open
    const focusable = getFocusableElements();
    const firstElement = focusable[0];

    if (firstElement) {
      firstElement.focus();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const currentFocusable = getFocusableElements();
      if (currentFocusable.length === 0) return;

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [active, ref]);
}
