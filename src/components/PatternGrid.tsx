"use client";

import {cn}                          from "@/lib/cn";
import {type TextMeasurer}           from "@/lib/decorationsText";
import {Pattern}                     from "@/lib/type";
import type {PatternGridTheme}       from "@/lib/uiTheme";
import {useEffect, useRef, useState} from "react";

type PatternGridProps = {
  inputText: string;
  onCopiedAction: (message: string) => void;
  theme: PatternGridTheme;
  patterns: Pattern[]
};

const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "true");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  await navigator.clipboard.writeText("copy");
  document.body.removeChild(textArea);
};

const createMeasurerFromElement = (element: HTMLElement): TextMeasurer | null => {
  const style = getComputedStyle(element);

  // style.font が取れない環境もあるので fallback を用意
  const font =
    style.font && style.font.length > 0
      ? style.font
      : `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize}/${style.lineHeight} ${style.fontFamily}`;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.font = font;

  const measurePx = (text: string) => ctx.measureText(text).width;

  const spacePx = measurePx(" ");
  const hPx = measurePx("─") || measurePx("━") || measurePx("-");

  return {
    measurePx,
    spacePx: Math.max(1, spacePx),
    hPx: Math.max(1, hPx),
  };
};

export default function PatternGrid({inputText, onCopiedAction, theme, patterns}: PatternGridProps) {
  const firstPreviewRef = useRef<HTMLPreElement | null>(null);
  const [measurer, setMeasurer] = useState<TextMeasurer | null>(null);

  useEffect(() => {
    const element = firstPreviewRef.current;
    if (!element) return;

    const next = createMeasurerFromElement(element);
    if (next) setMeasurer(next);
  }, []);

  const onClickPattern = async (patternId: string) => {
    const pattern =
      patterns.find((x) => x.id === patternId);
    if (!pattern) return;

    const output =
      measurer && pattern.buildMeasured(inputText, measurer) || ""

    try {
      await copyToClipboard(output);
      onCopiedAction("コピーしました");
    } catch {
      onCopiedAction("コピーに失敗しました");
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-3" aria-label="パターン一覧">
      {patterns.map((p, index) => {
        const previewText =
          measurer && p.buildMeasured(inputText, measurer);

        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onClickPattern(p.id)}
            className={cn(
              "xlike relative text-left rounded-3xl p-3",
              "backdrop-blur border shadow-sm",
              "transition hover:-translate-y-0.5",
              "focus:outline-none focus:ring-4",
              // Xっぽい見た目寄せ（ボタン側に置くのはOK、preにも念押し）
              "font-x text-[15px] leading-5 antialiased",
              theme.cardClass
            )}
          >
            <span
              className={cn(
                "absolute top-1.5 left-1.5",
                "h-5 pl-3 pr-3 rounded-full grid place-items-center",
                "border text-sm select-none shadow-sm",
                theme.badgeClass
              )}>{p.title}</span>
            <span
              title="コピー"
              aria-hidden="true"
              className={cn(
                "absolute top-2.5 right-2.5",
                "h-8 w-8 rounded-full grid place-items-center",
                "border text-sm select-none shadow-sm",
                theme.badgeClass
              )}
            >
              ⧉
            </span>

            <pre
              ref={index === 0 ? firstPreviewRef : undefined}
              className={cn(
                "m-0 rounded-2xl border px-4 py-3 pr-12",
                "whitespace-pre-wrap break-words",
                // ここが最重要：計測対象のフォント/サイズを固定
                "xlike text-[15px] leading-5 antialiased",
                theme.previewClass
              )}
            >
              {previewText}
            </pre>
          </button>
        );
      })}
    </section>
  );
}
