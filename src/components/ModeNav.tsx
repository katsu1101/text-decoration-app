"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Mode = {
  value: "ja" | "eisu" | "mori";
  href: string;
  label: string;        // 表示名（短く）
  sub?: string;         // 小さめ補助（任意）
  icon?: string;        // 絵文字（任意）
};

const MODES: Mode[] = [
  { value: "ja", href: "/",        label: "枠デコ",   sub: "日本語", icon: "🖼️" },
  { value: "eisu", href: "/eisu",  label: "英字デコ", sub: "ABC",  icon: "🔤" },
  { value: "mori", href: "/mori", label: "もり文字", sub: "結合", icon: "✨" },
];

const modeFromPath = (pathname: string): Mode["value"] => {
  if (pathname.startsWith("/eisu")) return "eisu";
  if (pathname.startsWith("/mori")) return "mori";
  return "ja";
};

export default function ModeTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const value = useMemo(() => modeFromPath(pathname), [pathname]);

  return (
    <div className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-3 py-2">
        <div className="flex items-center justify-center">
          <Tabs
            value={value}
            onValueChange={(next) => {
              const target = MODES.find((m) => m.value === next);
              if (target) router.push(target.href);
            }}
            className="w-full"
          >
            <TabsList
              className={cn(
                "w-full justify-start gap-2",
                "rounded-full bg-slate-100/80 p-1",
                "overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]",
                "[&::-webkit-scrollbar]:hidden"
              )}
            >
              {MODES.map((m) => (
                <TabsTrigger
                  key={m.value}
                  value={m.value}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2",
                    "transition",
                    "data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow",
                    "data-[state=inactive]:bg-white/0 data-[state=inactive]:text-slate-700",
                    "hover:bg-white/60"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {m.icon ? <span aria-hidden>{m.icon}</span> : null}
                    <span className="font-medium">{m.label}</span>
                    {m.sub ? (
                      <span className="text-xs opacity-70 hidden sm:inline">
                        {m.sub}
                      </span>
                    ) : null}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
