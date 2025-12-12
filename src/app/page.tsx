"use client";

import {cn}                   from "@/lib/cn";
import {useEffect, useState} from "react";
import PatternGrid            from "@/components/PatternGrid";
import TextInput            from "@/components/TextInput";
import Toast                from "@/components/Toast";
import { defaultPageTheme } from "@/lib/uiTheme";

const exampleTexts: string[] = [
  "7月4日は\n戸定梨香の誕生日！",
  "明日20:00 歌枠🎤\nみんな集合！",
  "新作公開しました✨\n感想ください！",
  "今夜はまったり雑談☕\n22:00〜\n来てくれたら嬉しいな",
  "おはようございます☀️\n今日もゆるっと\nがんばろ〜",
  "配信ありがとう！\n余韻がすごい…\nまた次も楽しみ",
  "告知です📢\n今週末コラボ！\n詳細はこのあと",
  "はじめての人も大歓迎！\n気軽にコメントしてね",
];

const pickRandom = (items: string[]): string => {
  const index = Math.floor(Math.random() * items.length);
  return items[index] ?? "";
};

export default function Page() {
  const [inputText, setInputText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setInputText(pickRandom(exampleTexts));
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  const theme = defaultPageTheme; // ここを差し替えるだけで全体の色が変わる

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 900);
  };

  return (
    <main className="min-h-dvh">
      <div className={cn("fixed inset-0 -z-10", theme.pageBackgroundClass)} />

      <div className="px-4 py-4 md:px-6 md:py-6 max-w-[1100px] mx-auto flex flex-col gap-4">
        <TextInput value={inputText} onChange={setInputText} theme={theme.textInput} />
        <PatternGrid inputText={inputText} onCopied={showToast} theme={theme.patternGrid} />
        <Toast message={toastMessage} theme={theme.toast} />
      </div>
    </main>
  );
}
