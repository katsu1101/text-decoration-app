"use client";

import PatternGrid           from "@/components/PatternGrid";
import TextInput             from "@/components/TextInput";
import Toast                 from "@/components/Toast";
import {cn}                  from "@/lib/cn";
import {ModeConfig}          from "@/lib/type";
import {defaultPageTheme}    from "@/lib/uiTheme";
import {modeConfigMap}       from "@/modes";
import {useEffect, useState} from "react";

const pickRandom = (items: string[]): string => {
  const index = Math.floor(Math.random() * items.length);
  return items[index] ?? "";
};

interface ClientPageProps {
  mode?: "jp" | "latin" | "combine"
}

export default function ClientPage({mode = "jp"}: ClientPageProps) {
  const config: ModeConfig = modeConfigMap[mode];
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
