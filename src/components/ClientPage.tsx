"use client";

import PatternGrid                   from "@/components/PatternGrid";
import TextInput                     from "@/components/TextInput";
import Toast                         from "@/components/Toast";
import {cn}                          from "@/lib/cn";
import {patterns as combinePatterns} from "@/lib/combineDecorations";
import {patterns as latinPatterns}   from "@/lib/latinDecorations";
import {patterns as jpPatterns}      from "@/lib/textDecorations";
import {defaultPageTheme}            from "@/lib/uiTheme";
import {useEffect, useState}         from "react";

const modeConfig = {
  jp: {
    title: "枠デコ（日本語）",
    patterns: jpPatterns,
    examples: [
      "7月4日は\n戸定梨香の誕生日！",
      "明日20:00 歌枠🎤\nみんな集合！",
      "新作公開しました✨\n感想ください！",
      "今夜はまったり雑談☕\n22:00〜\n来てくれたら嬉しいな",
      "おはようございます☀️\n今日もゆるっと\nがんばろ〜",
      "配信ありがとう！\n余韻がすごい…\nまた次も楽しみ",
      "告知です📢\n今週末コラボ！\n詳細はこのあと",
      "はじめての人も大歓迎！\n気軽にコメントしてね",
    ] as string[],
  },
  latin: {
    title: "英字デコ",
    patterns: latinPatterns,
    examples: [
      "NEW DROP ✨\nCHECK IT OUT!",
      "THANK YOU!\nSEE YOU NEXT LIVE",
      "COMING SOON\nSTAY TUNED",
    ] as string[]
  },
  combine: {
    title: "もり文字",
    patterns: combinePatterns,
    examples: [
      "すごい！！",
      "見て見て！",
      "ありがとう！",
    ] as string[],
  }
} as const;

const pickRandom = (items: string[]): string => {
  const index = Math.floor(Math.random() * items.length);
  return items[index] ?? "";
};

interface ClientPageProps {
  mode?: "jp" | "latin" | "combine"
}

export default function ClientPage({mode = "jp"}: ClientPageProps) {
  const config = modeConfig[mode];
  const [inputText, setInputText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setInputText(pickRandom(config.examples));
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [config.examples]);

  const theme = defaultPageTheme; // ここを差し替えるだけで全体の色が変わる

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 900);
  };

  return (
    <main className="min-h-dvh">
      <div className={cn("fixed inset-0 -z-10", theme.pageBackgroundClass)}/>

      <div className="px-4 py-4 md:px-6 md:py-6 max-w-[1100px] mx-auto flex flex-col gap-4">
        <TextInput value={inputText} onChangeAction={setInputText} theme={theme.textInput}/>
        <PatternGrid
          inputText={inputText}
          onCopiedAction={showToast}
          theme={theme.patternGrid}
          patterns={config.patterns}
        />
        <Toast message={toastMessage} theme={theme.toast}/>
      </div>
    </main>
  );
}
