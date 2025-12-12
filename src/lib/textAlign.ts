// src/lib/textAlign.ts

export type AlignMode = "left" | "center" | "right";

export type TextMeasurer = {
  measurePx: (text: string) => number;
  spacePx: number;
};

const splitLines = (text: string): string[] => text.replace(/\r\n/g, "\n").split("\n");

/**
 * 複数行テキストを、Xっぽい可変幅フォント前提で px 実測して寄せる
 * - 先頭スペースだけを追加（末尾スペースは基本足さない）
 */
export const alignMultilineMeasured = (
  inputText: string,
  measurer: TextMeasurer,
  mode: AlignMode
): string => {
  const lines = splitLines(inputText);

  const linePxList = lines.map((line) => measurer.measurePx(line));
  const maxPx = Math.max(1, ...linePxList);

  const spacePx = Math.max(1, measurer.spacePx);

  const alignedLines = lines.map((line, index) => {
    const linePx = linePxList[index];
    const diffPx = Math.max(0, maxPx - linePx);

    const leftPadPx =
      mode === "left" ? 0 :
        mode === "right" ? diffPx :
          Math.round(diffPx / 2);

    const leftSpaces = Math.max(0, Math.round(leftPadPx / spacePx));

    return `${" ".repeat(leftSpaces)}${line}`;
  });

  return alignedLines.join("\n");
};

/**
 * 計測がまだ無い時用のフォールバック（文字数ベース）
 * - Xでは完全一致しないけど、初回表示の繋ぎには十分
 */
export const alignMultilineFallback = (inputText: string, mode: AlignMode): string => {
  const lines = splitLines(inputText);
  const lengths = lines.map((line) => Array.from(line).length);
  const maxLen = Math.max(1, ...lengths);

  const alignedLines = lines.map((line, index) => {
    const len = lengths[index];
    const diff = Math.max(0, maxLen - len);

    const leftPad =
      mode === "left" ? 0 :
        mode === "right" ? diff :
          Math.floor(diff / 2);

    return `${" ".repeat(leftPad)}${line}`;
  });

  return alignedLines.join("\n");
};
