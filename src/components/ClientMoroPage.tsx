"use client";

import {cn}                                  from "@/lib/cn";
import {applyToSelection, Selection}         from "@/lib/decorationsMori";
import {defaultPageTheme}                    from "@/lib/uiTheme";
import {moriModeConfig, DIACRITIC_GROUPS} from "@/modes/mori";
import React, {useRef, useState}             from "react";

const keepSelection = (event: React.SyntheticEvent) => {
  event.preventDefault(); // フォーカス移動を防ぐ
};

export default function ClientMoriPage() {

  const [, setText] = useState<string>("");
  const [, setPendingSelection] = useState<Selection | null>(null);
  const [hint, setHint] = useState<string>("");

  const theme = defaultPageTheme;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);


  const onCopyAll = async () => {
    const currentText = textareaRef.current?.value ?? "";
    try {
      await navigator.clipboard.writeText(currentText);
      setHint("コピーしました。");
    } catch {
      setHint("コピーに失敗しました（権限/HTTPSを確認）。");
    } finally {
      window.setTimeout(() => setHint(""), 900);
    }
  };

  const getReplacementText = (
    previousText: string,
    nextText: string,
    start: number,
    end: number
  ) => {
    const selectionLength = end - start;
    const replacementLength = nextText.length - (previousText.length - selectionLength);
    return nextText.slice(start, start + replacementLength);
  };

  const onApplyCombining = (combiningMarks: string[]) => {
    const el = textareaRef.current;
    if (el === null) return;

    const selection: Selection = {
      start: el.selectionStart ?? 0,
      end: el.selectionEnd ?? 0,
    };

    const previousText = el.value;
    const {nextText, nextSelection} = applyToSelection(previousText, selection, combiningMarks);

    if (nextText === previousText) return;

    const replacementText = getReplacementText(
      previousText,
      nextText,
      selection.start,
      selection.end
    );

    el.focus();
    // ✅ ここが標準Undoに乗りやすい置換
    el.setRangeText(replacementText, selection.start, selection.end, "preserve");

    // stateは“結果を追従”するだけ（上書きしない）
    setText(el.value);
    setPendingSelection(nextSelection);

    setHint("適用しました。");
    window.setTimeout(() => setHint(""), 900);
  };

  return (
    <main className="min-h-dvh">
      <div className={cn("fixed inset-0 -z-10", theme.pageBackgroundClass)}/>

      <div className="px-4 py-4 md:px-6 md:py-6 max-w-[1100px] mx-auto flex flex-col gap-4">

        {/* ✅ 左：入力 / 右：ボタン（PCは2カラム、スマホは縦並び） */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4 items-start">
          {/* 左：入力欄 */}
          <section
            className="rounded-2xl border bg-white/70 dark:bg-black/30 backdrop-blur
            p-3 md:p-4 flex flex-col min-h-[10dvh]">
            <label className="block text-sm font-medium mb-2">入力</label>

            <textarea
              rows={3}
              ref={textareaRef}
              defaultValue={moriModeConfig.example}
              onInput={(e) => {
                const el = e.currentTarget;
                setText(el.value); // React側はミラー。Undo/Redo含めて追従します
              }}
              className={cn(
                "xlike w-full flex-1 resize-none rounded-2xl border bg-white/80",
                "dark:bg-black/40 p-4 text-base leading-relaxed outline-none focus:ring-2",
                "focus:ring-black/10 dark:focus:ring-white/15")}
              placeholder={"ここに入力して、範囲選択してからボタンで装飾します"}
            />
            <div className="mt-2 text-xs opacity-80">{hint}</div>
          </section>

          {/* 右：ボタン（道具箱） */}
          <section
            className="rounded-2xl border bg-white/70 dark:bg-black/30 backdrop-blur p-3 md:p-4 lg:sticky lg:top-4 max-h-[calc(100dvh-2rem)] overflow-y-auto">
            <div className="flex flex-col gap-4">
              {DIACRITIC_GROUPS.map((group) => (
                <div key={group.id} className="flex flex-col gap-2">
                  <div className="flex flex-row flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h2 className="text-sm md:text-base font-semibold">{group.label}</h2>
                    {group.description ? (
                      <p className="text-xs opacity-75">{group.description}</p>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-9 gap-2">
                    {group.buttons.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onPointerDown={keepSelection}
                        onMouseDown={keepSelection}
                        onClick={() => onApplyCombining(b.marks)}
                        title={b.title}               // hover時の説明（表示はしない）
                        aria-label={b.title}          // アクセシビリティ用（表示はしない）
                        className={cn(
                          "h-9 w-9 rounded-xl border",
                          "flex items-center justify-center",
                          "bg-white/70 dark:bg-black/30",
                          "hover:bg-black/5 dark:hover:bg-white/10",
                          "active:scale-[0.98] transition",
                          "text-[18px] font-semibold leading-none",
                        )}
                      >
                        {b.sample}
                      </button>
                    ))}
                  </div>

                </div>
              ))}

              <div className="border-t pt-3 flex flex-wrap items-center gap-2">

                <button
                  type="button"
                  onClick={onCopyAll}
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.99] transition"
                >
                  ⧉ Copy
                </button>
              </div>

              <div className="text-xs opacity-80">
                使い方: 入力 → 範囲選択 → 右のボタン
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}