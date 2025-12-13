"use client";

import {cn}                                           from "@/lib/cn";
import {defaultPageTheme}                             from "@/lib/uiTheme";
import {useEffect, useLayoutEffect, useRef, useState} from "react";


const keepSelection = (event: React.SyntheticEvent) => {
  event.preventDefault(); // フォーカス移動を防ぐ
};

type DiacriticButton = Readonly<{
  id: string;
  title: string;
  marks: string[];
  sample: string;
}>;

type DiacriticGroup = Readonly<{
  id: string;
  label: string;
  description?: string;
  buttons: readonly DiacriticButton[];
}>;

const DIACRITIC_GROUPS: readonly DiacriticGroup[] = [
  {
    id: "top",
    label: "上につく",
    description: "見た目が安定しやすく、飾りとして使いやすい",
    buttons: [
      {id: "macron", title: "マクロン（Ā）", marks: ["\u0304"], sample: "Ā"},
      {id: "acute", title: "アキュート（Á）", marks: ["\u0301"], sample: "Á"},
      {id: "grave", title: "グレイヴ（À）", marks: ["\u0300"], sample: "À"},
      {id: "circumflex", title: "ハット（Â）", marks: ["\u0302"], sample: "Â"},
      {id: "tilde", title: "チルダ（Ã）", marks: ["\u0303"], sample: "Ã"},
      {id: "diaeresis", title: "ウムラウト（Ä）", marks: ["\u0308"], sample: "Ä"},
      {id: "ring", title: "リング（Å）", marks: ["\u030A"], sample: "Å"},
      {id: "dotAbove", title: "ドット（Ȧ）", marks: ["\u0307"], sample: "Ȧ"},
      {id: "caron", title: "ハーチェク（Č）", marks: ["\u030C"], sample: "Č"},
    ],
  },
  {
    id: "bottom",
    label: "下につく",
    description: "呪い感・重さが出る（環境差は少し増える）",
    buttons: [
      {id: "dotBelow", title: "ドット下（ạ）", marks: ["\u0323"], sample: "ạ"},
      {id: "cedilla", title: "セディーユ（Ç）", marks: ["\u0327"], sample: "Ç"},
      {id: "ogonek", title: "フック（Ą）", marks: ["\u0328"], sample: "Ą"},
    ],
  },
  {
    id: "set",
    label: "セット",
    description: "組み合わせで面白い形に！",
    buttons: [
      {id: "cute_sparkle", sample: "✨", title: "きらきら", marks: ["\u0308", "\u0307"]}, // ̈ ̇
      {id: "cute_wavy", sample: "🌸", title: "ふわゆら", marks: ["\u0303", "\u0307"]}, // ̃ ̇
      {id: "cute_chic", sample: "🎀", title: "おしゃれ", marks: ["\u0302", "\u0308"]}, // ̂ ̈

      {id: "crown", sample: "👑", title: "王冠", marks: ["\u0302", "\u030A", "\u0307"]}, // ̂ ̊ ̇
      {id: "antenna", sample: "📡", title: "アンテナ", marks: ["\u0304", "\u0303"]},       // ̄ ̃
      {id: "curse", sample: "🕯️", title: "呪い", marks: ["\u0323", "\u0331", "\u0324"]},  // ̣ ̱ ̤
      {id: "glitch", sample: "👾", title: "グリッチ", marks: ["\u0336", "\u0338", "\u0303"]}, // ̶ ̸ ̃
    ]
  },
  {
    id: "glitch",
    label: "グリッチ",
    description: "傷・禁止っぽい。崩れたらそれも味",
    buttons: [
      {id: "strikeComb", title: "傷（̶）", marks: ["\u0336"], sample: "̶"},
      {id: "slashComb", title: "スラッシュ（̸）", marks: ["\u0338"], sample: "̸"},
    ],
  },
] as const;


type Selection = Readonly<{ start: number; end: number }>;

const isAsciiLatinLetter = (ch: string): boolean => {
  const codePoint = ch.codePointAt(0);
  if (codePoint === undefined) return false;
  const isUpper = codePoint >= 0x41 && codePoint <= 0x5a;
  const isLower = codePoint >= 0x61 && codePoint <= 0x7a;
  return isUpper || isLower;
};

const applyCombiningToLatin = (text: string, combiningMarks: string[]): string => {
  const decorated = Array.from(text)
    .map((ch) => (isAsciiLatinLetter(ch) ? `${ch}${combiningMarks.join("")}` : ch))
    .join("");

  // 可能なら Ā のような合成済み文字に寄せる
  return decorated.normalize("NFC");
};

const applyToSelection = (
  fullText: string,
  selection: Selection,
  combiningMarks: string[]
): { nextText: string; nextSelection: Selection } => {
  if (selection.start === selection.end) {
    // 選択が無いなら何もしない（まずは安全に）
    return {nextText: fullText, nextSelection: selection};
  }

  const before = fullText.slice(0, selection.start);
  const selected = fullText.slice(selection.start, selection.end);
  const after = fullText.slice(selection.end);

  const replaced = applyCombiningToLatin(selected, combiningMarks);
  const nextText = before + replaced + after;

  // textareaの selectionStart/End は UTF-16 index なので length で合わせる
  const nextSelection: Selection = {
    start: selection.start,
    end: selection.start + replaced.length,
  };

  return {nextText, nextSelection};
};

export default function CombinePage() {
  const theme = defaultPageTheme;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [text, setText] = useState<string>(
    "New drop ✨\ncheck it out!\n\n範囲選択して、マクロン（Ā）を押してください。"
  );
  const [pendingSelection, setPendingSelection] = useState<Selection | null>(null);
  const [hint, setHint] = useState<string>("");

  type Snapshot = Readonly<{
    text: string;
    selection: Selection;
  }>;

  const [past, setPast] = useState<Snapshot[]>([]);
  const [future, setFuture] = useState<Snapshot[]>([]);

  const commit = (nextText: string, nextSelection: Selection) => {
    const el = textareaRef.current;
    const currentSelection: Selection = el
      ? {start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0}
      : {start: 0, end: 0};

    setPast((prev) => [...prev, {text, selection: currentSelection}]);
    setFuture([]); // 新しい編集が入ったら redo は破棄

    setText(nextText);
    setPendingSelection(nextSelection);
  };
  const onUndo = () => {
    setPast((prevPast) => {
      if (prevPast.length === 0) return prevPast;

      const previous = prevPast[prevPast.length - 1]!;
      const nextPast = prevPast.slice(0, -1);

      const el = textareaRef.current;
      const currentSelection: Selection = el
        ? {start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0}
        : {start: 0, end: 0};

      setFuture((prevFuture) => [{text, selection: currentSelection}, ...prevFuture]);

      setText(previous.text);
      setPendingSelection(previous.selection);

      return nextPast;
    });
  };

  const onRedo = () => {
    setFuture((prevFuture) => {
      if (prevFuture.length === 0) return prevFuture;

      const next = prevFuture[0]!;
      const rest = prevFuture.slice(1);

      const el = textareaRef.current;
      const currentSelection: Selection = el
        ? {start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0}
        : {start: 0, end: 0};

      setPast((prevPast) => [...prevPast, {text, selection: currentSelection}]);

      setText(next.text);
      setPendingSelection(next.selection);

      return rest;
    });
  };

  const onCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setHint("コピーしました。");
    } catch {
      setHint("コピーに失敗しました（権限/HTTPSを確認）。");
    } finally {
      window.setTimeout(() => setHint(""), 900);
    }
  };

  useLayoutEffect(() => {
    if (pendingSelection === null) return;
    const el = textareaRef.current;
    if (el === null) return;

    el.focus();
    el.setSelectionRange(pendingSelection.start, pendingSelection.end);
    setPendingSelection(null);
  }, [pendingSelection]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      // IME変換中は触らない（日本語入力の事故防止）
      if (event.isComposing) return;

      const key = event.key.toLowerCase();
      const isMod = event.ctrlKey || event.metaKey; // Win/Linux: Ctrl, Mac: Cmd
      if (!isMod) return;

      // Ctrl/Cmd + Z = Undo
      const isUndo = key === "z" && !event.shiftKey && !event.altKey;

      // Redo: Ctrl/Cmd + Shift + Z（Macでも一般的）
      const isRedoByShiftZ = key === "z" && event.shiftKey && !event.altKey;

      // Redo: Ctrl + Y（Windows系の定番）
      const isRedoByY = key === "y" && !event.shiftKey && !event.altKey;

      if (isUndo) {
        event.preventDefault();
        onUndo();
        return;
      }

      if (isRedoByShiftZ || isRedoByY) {
        event.preventDefault();
        onRedo();
        return;
      }
    };

    // capture=true にしておくと、textarea側の標準Undoより先に拾いやすいです
    window.addEventListener("keydown", handler, {capture: true});
    return () => window.removeEventListener("keydown", handler, {capture: true} as any);
  }, [onUndo, onRedo]);

  const onApplyCombining = (combiningMarks: string[]) => {
    const el = textareaRef.current;
    if (el === null) return;

    const selection: Selection = {
      start: el.selectionStart ?? 0,
      end: el.selectionEnd ?? 0,
    };

    const {nextText, nextSelection} = applyToSelection(text, selection, combiningMarks);

    if (nextText === text) {
      // setHint("範囲選択してから押してください。");
      // window.setTimeout(() => setHint(""), 1200);
      return;
    }

    // setText(nextText);
    // setPendingSelection(nextSelection);
    commit(nextText, nextSelection);
    setHint("適用しました。");
    window.setTimeout(() => setHint(""), 900);
  };
  return (
    <main className="min-h-dvh">
      <div className={cn("fixed inset-0 -z-10", theme.pageBackgroundClass)}/>

      <div className="px-4 py-4 md:px-6 md:py-6 max-w-[1100px] mx-auto flex flex-col gap-4">
        <header className="flex flex-col gap-1">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">
            アクセント文字（選択して適用）
          </h1>
        </header>

        {/* ✅ 左：入力 / 右：ボタン（PCは2カラム、スマホは縦並び） */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4 items-start">
          {/* 左：入力欄 */}
          <section
            className="rounded-2xl border bg-white/70 dark:bg-black/30 backdrop-blur p-3 md:p-4 flex flex-col min-h-[65dvh]">
            <label className="block text-sm font-medium mb-2">入力（大きめ）</label>

            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="xlike w-full flex-1 resize-none rounded-2xl border bg-white/80 dark:bg-black/40 p-4 text-base leading-relaxed outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/15"
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

                  <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-2">
                    {group.buttons.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onPointerDown={keepSelection}
                        onMouseDown={keepSelection}
                        onClick={() => onApplyCombining(b.marks)}
                        title={b.title}               // hover時の説明（表示はしない）
                        aria-label={b.title}          // アクセシビリティ用（表示はしない）
                        className="
        h-9 w-9 rounded-xl border
        flex items-center justify-center
        bg-white/70 dark:bg-black/30
        hover:bg-black/5 dark:hover:bg-white/10
        active:scale-[0.98] transition
        text-[18px] font-semibold leading-none
      "
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
                  onClick={onUndo}
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.99] transition"
                >
                  ↶ Undo
                </button>

                <button
                  type="button"
                  onClick={onRedo}
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.99] transition"
                >
                  ↷ Redo
                </button>

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
