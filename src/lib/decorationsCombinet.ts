export type Selection = Readonly<{ start: number; end: number }>;

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

export const applyToSelection = (
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
