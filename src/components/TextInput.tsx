"use client";

import {cn}                  from "@/lib/cn";
import type {TextInputTheme} from "@/lib/uiTheme";

type TextInputProps = {
  value: string;
  onChangeAction: (nextValue: string) => void;
  placeholder?: string;
  theme: TextInputTheme;
};

export default function TextInput({value, onChangeAction, placeholder, theme}: TextInputProps) {
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-[560px]">
        <div className="mb-2 flex items-center justify-between">
          <div className={cn("text-sm font-semibold", theme.labelClass)}>入力</div>
          <div className={cn("text-xs", theme.subLabelClass)}>ここを書き換える</div>
        </div>

        <textarea
          className={cn(
            "xlike whitespace-pre-wrap break-words",
            "text-[15px] leading-5",          // 15px + line-height: 1.25(=20px)
            "antialiased",                           // 近い“見え方”になりやすい
            "w-full min-h-[96px] resize-y",
            "rounded-3xl px-4 py-3 outline-none",
            "border shadow-sm",
            "focus:ring-4",
            theme.textareaClass)}
          rows={3}
          value={value}
          onChange={(e) => onChangeAction(e.target.value)}
          placeholder={placeholder ?? "例）明日20:00 歌枠\n〇〇"}
          aria-label="入力"
        />

        <div className={cn("mt-2 text-center text-xs", theme.hintClass)}>
          下のカードをタップするとコピーされます
        </div>
      </div>
    </section>
  );
}
