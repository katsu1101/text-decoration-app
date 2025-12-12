// src/lib/textWidth.ts

const isCombiningMark = (char: string): boolean => {
  // 濁点などの結合文字は幅0扱い（モダンブラウザ前提）
  return /\p{Mark}/u.test(char);
};

const isFullWidthLike = (codePoint: number): boolean => {
  // “だいたい全角”を判定（多くの実装で使われる代表的レンジ）
  // 完璧ではないが、日本語や多くの絵文字で効く
  return (
    codePoint >= 0x1100 &&
    (codePoint <= 0x115f ||
      codePoint === 0x2329 ||
      codePoint === 0x232a ||
      (codePoint >= 0x2e80 && codePoint <= 0xa4cf && codePoint !== 0x303f) ||
      (codePoint >= 0xac00 && codePoint <= 0xd7a3) ||
      (codePoint >= 0xf900 && codePoint <= 0xfaff) ||
      (codePoint >= 0xfe10 && codePoint <= 0xfe19) ||
      (codePoint >= 0xfe30 && codePoint <= 0xfe6f) ||
      (codePoint >= 0xff00 && codePoint <= 0xff60) ||
      (codePoint >= 0xffe0 && codePoint <= 0xffe6) ||
      // 絵文字など（ざっくり）
      (codePoint >= 0x1f300 && codePoint <= 0x1fadf) ||
      (codePoint >= 0x20000 && codePoint <= 0x3fffd))
  );
};

export const getDisplayWidth = (text: string): number => {
  let width = 0;

  for (const char of Array.from(text)) {
    if (isCombiningMark(char)) continue;
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) continue;

    width += isFullWidthLike(codePoint) ? 2 : 1;
  }

  return width;
};

const makePadding = (units: number): string => {
  // ★ 全角スペースをやめて、半角スペースだけで埋める
  // “2単位=スペース2個” になるので、可変幅でも大崩れしにくい
  return " ".repeat(Math.max(0, units));
};

export const padEndToDisplayWidth = (text: string, targetWidth: number): string => {
  const currentWidth = getDisplayWidth(text);
  if (currentWidth >= targetWidth) return text;
  return text + makePadding(targetWidth - currentWidth);
};
