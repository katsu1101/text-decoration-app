/**
 * 注意:
 * - Unicodeの装飾文字は環境/フォント次第で□になることがあります（Xも端末差が出ます）
 * - "斜体/太字斜体" は数字の専用グリフがないので数字はそのまま
 * - 合成文字（下線/取り消し線）は表示が不安定になりやすい（でも「それっぽさ」は強い）
 */

type EisuStyle =
  | "bold"
  | "italic"
  | "boldItalic"
  | "doubleStruck" // 黒板文字
  | "monospace"
  | "sansBold"
  // 追加
  | "circled" // 丸囲み
  | "parenthesized" // 括弧つき
  | "squared" // 角囲み（大文字のみ）
  | "smallcaps" // スモールキャップ（近似）
  | "underlineCombining"
  | "strikeCombining";

type EisuOffset = {
  upper: number; // 'A'
  lower: number; // 'a'
  digit?: number; // '0'（無いスタイルもある）
};

const OFFSETS: Record<
  Exclude<
    EisuStyle,
    | "circled"
    | "parenthesized"
    | "squared"
    | "smallcaps"
    | "regionalIndicator"
    | "underlineCombining"
    | "strikeCombining"
  >,
  EisuOffset
> = {
  bold: {upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce},
  italic: {upper: 0x1d434, lower: 0x1d44e}, // 数字は無し
  boldItalic: {upper: 0x1d468, lower: 0x1d482}, // 数字は無し
  doubleStruck: {upper: 0x1d538, lower: 0x1d552, digit: 0x1d7d8},
  monospace: {upper: 0x1d670, lower: 0x1d68a, digit: 0x1d7f6},
  sansBold: {upper: 0x1d5d4, lower: 0x1d5ee, digit: 0x1d7ec},
};

const EXCEPTIONS: Partial<Record<keyof typeof OFFSETS, Record<string, string>>> = {
  italic: {
    h: "\u210E", // ℎ
  },
  doubleStruck: {
    C: "\u2102", // ℂ
    H: "\u210D", // ℍ
    N: "\u2115", // ℕ
    P: "\u2119", // ℙ
    Q: "\u211A", // ℚ
    R: "\u211D", // ℝ
    Z: "\u2124", // ℤ
  },
};

const toOffsetStyled = (text: string, style: keyof typeof OFFSETS): string => {
  const offset = OFFSETS[style];
  const exceptionMap = EXCEPTIONS[style];

  return Array.from(text).map((ch) => {
    const exception = exceptionMap?.[ch];
    if (exception !== undefined) return exception;

    const codePoint = ch.codePointAt(0);
    if (codePoint === undefined) return ch;

    if (codePoint >= 0x41 && codePoint <= 0x5a) {
      return String.fromCodePoint(offset.upper + (codePoint - 0x41));
    }
    if (codePoint >= 0x61 && codePoint <= 0x7a) {
      return String.fromCodePoint(offset.lower + (codePoint - 0x61));
    }
    if (codePoint >= 0x30 && codePoint <= 0x39 && offset.digit !== undefined) {
      return String.fromCodePoint(offset.digit + (codePoint - 0x30));
    }
    return ch;
  }).join("");
};

// 追加: 丸囲み（a-z/A-Z/0-9）
const toCircled = (text: string): string => {
  return Array.from(text)
    .map((ch) => {
      const code = ch.codePointAt(0);
      if (code === undefined) return ch;

      // A-Z: Ⓐ(24B6) .. Ⓩ(24CF)
      if (code >= 0x41 && code <= 0x5a) return String.fromCodePoint(0x24b6 + (code - 0x41));
      // a-z: ⓐ(24D0) .. ⓩ(24E9)
      if (code >= 0x61 && code <= 0x7a) return String.fromCodePoint(0x24d0 + (code - 0x61));
      // 0: ⓪(24EA)
      if (code === 0x30) return String.fromCodePoint(0x24ea);
      // 1-9: ①(2460) .. ⑨(2468)
      if (code >= 0x31 && code <= 0x39) return String.fromCodePoint(0x2460 + (code - 0x31));

      return ch;
    })
    .join("");
};

// 追加: 括弧つき（a-z/1-20が主、ここは a-z と 1-9 だけ対応）
const toParenthesized = (text: string): string => {
  return Array.from(text.toLowerCase())
    .map((ch) => {
      const code = ch.codePointAt(0);
      if (code === undefined) return ch;

      // a-z: ⒜(249C) .. ⒵(24B5)
      if (code >= 0x61 && code <= 0x7a) return String.fromCodePoint(0x249c + (code - 0x61));
      // 1-9: ⑴(2474) .. ⑼(247C)
      if (code >= 0x31 && code <= 0x39) return String.fromCodePoint(0x2474 + (code - 0x31));

      return ch;
    })
    .join("");
};

// 追加: 角囲み（🄰..🅉 大文字のみ）
const toSquared = (text: string): string => {
  return Array.from(text.toUpperCase())
    .map((ch) => {
      const code = ch.codePointAt(0);
      if (code === undefined) return ch;

      // A-Z: 🄰(1F130) .. 🅉(1F149)
      if (code >= 0x41 && code <= 0x5a) return String.fromCodePoint(0x1f130 + (code - 0x41));
      return ch;
    })
    .join("");
};

// 追加: スモールキャップ（近似）
const SMALLCAPS_MAP: Record<string, string> = {
  A: "ᴀ",
  B: "ʙ",
  C: "ᴄ",
  D: "ᴅ",
  E: "ᴇ",
  F: "ғ",
  G: "ɢ",
  H: "ʜ",
  I: "ɪ",
  J: "ᴊ",
  K: "ᴋ",
  L: "ʟ",
  M: "ᴍ",
  N: "ɴ",
  O: "ᴏ",
  P: "ᴘ",
  Q: "ǫ",
  R: "ʀ",
  S: "s",
  T: "ᴛ",
  U: "ᴜ",
  V: "ᴠ",
  W: "ᴡ",
  X: "x",
  Y: "ʏ",
  Z: "ᴢ",
};
const toSmallcaps = (text: string): string => {
  return Array.from(text)
    .map((ch) => {
      const upper = ch.toUpperCase();
      if (upper >= "A" && upper <= "Z") return SMALLCAPS_MAP[upper] ?? upper;
      return ch;
    })
    .join("");
};

const blackboardUpper: Record<string, string> = {
  A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾",
  H: "ℍ", I: "𝕀", J: "𝕁", K: "𝕂", L: "𝕃", M: "𝕄",
  N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊",
  T: "𝕋", U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ",
};

// 追加: 合成下線/取り消し線
const applyCombining = (text: string, combiningChar: string): string => {
  // 既に合成記号が付いてる文字に重ねると荒れるので、空白は避ける
  return Array.from(text)
    .map((ch) => (ch === " " || ch === "\n" ? ch : `${ch}${combiningChar}`))
    .join("");
};

/**
 * 黒板文字
 * @param text
 */
const toBlackboard = (text: string): string => {
  return Array.from(text).map((ch) => {
    if (ch >= "A" && ch <= "Z") return blackboardUpper[ch] ?? ch;

    // 小文字 a-z は連番なので算術でOK（表示が崩れる環境は別問題）
    if (ch >= "a" && ch <= "z") {
      const codePoint = ch.codePointAt(0)! - "a".codePointAt(0)! + 0x1d552; // 𝕒
      return String.fromCodePoint(codePoint);
    }

    return ch;
  }).join("");
};

export const applyEisuStyle = (text: string, style: EisuStyle): string => {
  switch (style) {
    case "bold":
    case "italic":
    case "boldItalic":
    case "monospace":
    case "sansBold":
      return toOffsetStyled(text, style);

    case "doubleStruck":
      return toBlackboard(text)

    case "circled":
      return toCircled(text);

    case "parenthesized":
      return toParenthesized(text);

    case "squared":
      return toSquared(text);

    case "smallcaps":
      return toSmallcaps(text);

    case "underlineCombining":
      return applyCombining(text, "\u0332"); // COMBINING LOW LINE

    case "strikeCombining":
      return applyCombining(text, "\u0336"); // COMBINING LONG STROKE OVERLAY

  }
};


type CharMap = Record<string, string>;

const mapChars = (text: string, map: CharMap): string => {
  // サロゲートペアも壊さない
  return Array.from(text).map((ch) => map[ch] ?? ch).join("");
};

/**
 * 筆記体（太め・統一）
 * Mathematical Bold Script を使用（混在しない）
 */
const MATH_BOLD_SCRIPT: CharMap = {
  "A": "𝓐",
  "B": "𝓑",
  "C": "𝓒",
  "D": "𝓓",
  "E": "𝓔",
  "F": "𝓕",
  "G": "𝓖",
  "H": "𝓗",
  "I": "𝓘",
  "J": "𝓙",
  "K": "𝓚",
  "L": "𝓛",
  "M": "𝓜",
  "N": "𝓝",
  "O": "𝓞",
  "P": "𝓟",
  "Q": "𝓠",
  "R": "𝓡",
  "S": "𝓢",
  "T": "𝓣",
  "U": "𝓤",
  "V": "𝓥",
  "W": "𝓦",
  "X": "𝓧",
  "Y": "𝓨",
  "Z": "𝓩",
  "a": "𝓪",
  "b": "𝓫",
  "c": "𝓬",
  "d": "𝓭",
  "e": "𝓮",
  "f": "𝓯",
  "g": "𝓰",
  "h": "𝓱",
  "i": "𝓲",
  "j": "𝓳",
  "k": "𝓴",
  "l": "𝓵",
  "m": "𝓶",
  "n": "𝓷",
  "o": "𝓸",
  "p": "𝓹",
  "q": "𝓺",
  "r": "𝓻",
  "s": "𝓼",
  "t": "𝓽",
  "u": "𝓾",
  "v": "𝓿",
  "w": "𝔀",
  "x": "𝔁",
  "y": "𝔂",
  "z": "𝔃",
};

export const toScriptBold = (text: string): string => mapChars(text, MATH_BOLD_SCRIPT);
