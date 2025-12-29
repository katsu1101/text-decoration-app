import type { ReactNode } from "react";
import Link from "next/link";

const guideLinks = [
  { href: "/guide/waku", label: "枠デコ" },
  { href: "/guide/eisu", label: "英数デコ" },
  { href: "/guide/mori", label: "もり文字" },
] as const;

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh">
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-[1100px] mx-auto">
        <div className="max-w-[860px] space-y-4">
          {/* ガイド用の軽いヘッダー */}
          <header className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Link className="underline" href="/">
                ツールへ戻る
              </Link>
              <span className="opacity-60">/</span>
              <Link className="underline" href="/guide">
                ガイド目次
              </Link>
            </div>

            <nav aria-label="ガイド内ナビ" className="flex flex-wrap gap-2">
              {guideLinks.map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="text-sm underline opacity-80"
                >
                  {x.label}
                </Link>
              ))}
            </nav>
          </header>

          {/* 本文の統一枠（ここで読み物っぽくする） */}
          <div className="rounded-2xl border p-4 md:p-6">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
