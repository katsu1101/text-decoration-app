"use client";

import {cn}                from "@/lib/cn";
import type { ToastTheme } from "@/lib/uiTheme";

type ToastProps = {
  message: string | null;
  theme: ToastTheme;
};

export default function Toast({ message, theme }: ToastProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 bottom-4 z-50",
        "px-4 py-2 rounded-full text-sm",
        "border backdrop-blur shadow-lg",
        theme.toastClass)}
    >
      {message}
    </div>
  );
}
