// src/lib/textDecorations.ts
import { alignMultilineMeasured } from "@/lib/textAlign";

export type Pattern = {
  id: string;
  buildMeasured: (inputText: string, measurer: TextMeasurer) => string;
};

type BoxOpt = {
  topL: string; topR: string;
  botL: string; botR: string;
  top: string; bot: string;
  l: string; r: string;

  // ★追加：上下の中央（1回だけ）
  topC?: string;
  botC?: string;

  // 追加（任意）：左右のバランス(0..100)。50=中央寄せ
  leftPercent?: number;

  // 追加（任意）：ブレ吸収（半角スペース換算）
  safetySpaces?: number;
};

type BoxOptInput = Partial<BoxOpt> & Pick<BoxOpt, "l" | "r">; // l/r だけ必須にする

const defaultBoxOpt: BoxOpt = {
  topL: "", topC: "", top: "", topR: "",
  l: "", r: "",
  botL: "", botC: "", bot: "", botR: "",

  leftPercent: 50,
  safetySpaces: 2,
};

const normalizeBoxOpt = (input: BoxOptInput): BoxOpt => {
  return { ...defaultBoxOpt, ...input };
};

const splitLines = (text: string): string[] => text.replace(/\r\n/g, "\n").split("\n");

export const patterns: Pattern[] = [
  {
    id: "rule",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        { top: "━", bot: "━", l: " ", r: " " },
        measurer
      ),
  },
  {
    id: "box_round",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        { topL: "╭", top: "─", topR: "─╮",
          l: "│", r: "　",
          botL: "╰", botC: "ｖ", bot: "─",botR: "─╯",
        },
        measurer
      ),
  },
  {
    id: "box_bold",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        { topL: "┏", top: "━", topR: "━┓",
          l: "┃", r: "　",
          botL: "┗", botC: "┳", bot: "━",botR: "━┛",
        },
        measurer
      ),
  },
  {
    id: "ribbon",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        {
          topL: "✦ ", top: "─", topR: " ✦",
          l: " ", r: " ",
          botL: "✧ ", bot: "─", botR: " ✧"
        },
        measurer
      ),
  },
  // {
  //   id: "kawaii_wings",
  //   buildMeasured: (t, measurer) =>
  //     makeBoxMeasured(
  //       splitLines(t),
  //       { l: "꒰ঌ", r: "໒꒱" },
  //       measurer
  //     ),
  // },
  // {
  //   id: "kawaii_lace",
  //   buildMeasured: (t, measurer) =>
  //     makeBoxMeasured(
  //       splitLines(t),
  //       { l: "୨୧", r: "୨୧" },
  //       measurer
  //     ),
  // },
  {
    id: "hoge",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        {
          // ||◤　　　　　　　 ◥||
          // 　あああああ
          // ||◣　　　　　　　 ◢||
          topL: "||◤", topR: "◥||",
          l:"　", r: "　",
          botL: "||◣", botR: "◢||"
        },
        measurer
      ),
  },
  {
    id: "hoge2",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        {
          // ◤▔▔▔▔▔▔▔▔▔▔◥
          //     2025年12月8日（月）
          // ◣▁▁▁▁▁▁▁▁▁▁◢
          topL: "◤", top: "▔", topR: "◥",
          l:"", r: "",
          botL: "◣", bot: "▁", botR: "◢"
        },
        measurer
      ),
  },
  {
    id: "fuga",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        {
          // ＿人人人人人人人人人人＿
          // ＞　ああああああああ　＜
          // ￣Y^Y^ Y^Y^Y^Y^Y^Y^Y￣
          topL: "＿", top: "人", topR: "＿",
          l:"＞", r: "　",
          botL: "￣", bot: "Y", botR: "￣"},
        measurer
      ),
  },
  {
    id: "𝙄𝙩'𝙨 𝙨𝙝𝙤𝙬 𝙩𝙞𝙢𝙚",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        {
          // ＼＼　 \ 　/ 　／／
          // 🕶𝙄𝙩'𝙨 𝙨𝙝𝙤𝙬 𝙩𝙞𝙢𝙚🕶
          // ／／　 /　 \　 ＼＼
          topL: "＼＼", topC: '⧵ 　/', topR: "／／",
          l:"　", r: "　",
          botL: "／／", botC: "/　 ⧵", botR: "＼＼"},
        measurer
      ),
  },
  {
    id: "kira kira",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        {
          // ୨୧‥∵‥‥∵‥‥∵‥‥∵‥‥∵‥୨୧
          // X(旧Twitter)の文字装飾！
          // 　目立つ投稿に役立つ”囲み”テンプレ
          // ୨୧‥∵‥‥∵‥‥∵‥‥∵‥‥∵‥୨୧
          topL: "୨୧", top: '‥∵‥', topR: "୨୧",
          l:"　", r: "　",
          botL: "୨୧", bot: "‥∵‥", botR: "୨୧"},
        measurer
      ),
  },
  {
    id: "neko",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        {
          // ＿＿＿◣＿＿＿＿＿◢＿＿＿
          // 　　　文字を記載🐾
          // ＿＿＿＿＿＿＿＿＿＿＿＿𓂃
          topC: '◣＿＿＿＿◢', top: "＿",
          l:"　", r: "　",
          bot: "＿", botR: "𓂃",
        },
        measurer
      ),
  },
  {
    id: "eva",
    buildMeasured: (t, measurer) =>
      makeBoxMeasured(
        splitLines(t),
        {
          // ＿＿＿◣＿＿＿＿＿◢＿＿＿
          // 　　　文字を記載🐾
          // ＿＿＿＿＿＿＿＿＿＿＿＿𓂃
          topL: '╋━━',
          l:"　", r: "　",
          botR: "━━━╋",
        },
        measurer
      ),
    // ╋━━
    // 　EVA 再始動
    // 　　　━━━╋
  }
];

export type TextMeasurer = {
  measurePx: (text: string) => number;
  spacePx: number;
  hPx: number;
};

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

type BuildLineByPercentArgs = {
  targetPx: number;
  left: string;
  center: string;
  right: string;
  fill: string;
  leftPercent: number;     // 0..100
  measurer: TextMeasurer;
  capRepeat?: number;
  minRepeat?: number;      // 上下線などで最低1回繰り返したい時に使う
};

const buildLineByPercent = ({
                              targetPx,
                              left,
                              center,
                              right,
                              fill,
                              leftPercent,
                              measurer,
                              capRepeat = 200,
                              minRepeat = 0,
                            }: BuildLineByPercentArgs): string => {
  // 全部空なら空行
  if (left === "" && center === "" && right === "" && fill === "") return "";

  const lp = clamp(leftPercent, 0, 100) / 100;

  const leftPx = measurer.measurePx(left);
  const centerPx = measurer.measurePx(center);
  const rightPx = measurer.measurePx(right);

  const fillChar = fill.length === 0 ? " " : fill;
  const fillPxRaw = measurer.measurePx(fillChar);
  const fillPx = Math.max(1, fillPxRaw || measurer.hPx || measurer.spacePx);

  const remainPx = Math.max(0, targetPx - (leftPx + centerPx + rightPx));
  const computedRepeat = clamp(Math.round(remainPx / fillPx), 0, capRepeat);
  const totalRepeat = Math.max(minRepeat, computedRepeat);

  const leftRepeat = clamp(Math.round(totalRepeat * lp), 0, totalRepeat);
  const rightRepeat = totalRepeat - leftRepeat;

  return `${left}${fillChar.repeat(leftRepeat)}${center}${fillChar.repeat(rightRepeat)}${right}`;
};

const makeBoxMeasured = (lines: string[], optInput: BoxOptInput, measurer: TextMeasurer): string => {
  const opts = normalizeBoxOpt(optInput);

  const spacePx = Math.max(1, measurer.spacePx);

  // 1) targetContentPx を決める（本文最大幅 + safety）
  const linePxList = lines.map((line) => measurer.measurePx(line));
  const maxLinePx = Math.max(1, ...linePxList);

  const safetySpaces = opts.safetySpaces ?? 2;
  const targetContentPx = maxLinePx + spacePx * safetySpaces;

  // 2) 本文行の固定パーツ（あなたの従来仕様：l と r の内側にスペース1個）
  const bodyLeft = `${opts.l} `;
  const bodyRight = ` ${opts.r}`;

  // 3) ここが「全行共通の目標幅(px)」
  const targetLinePx = measurer.measurePx(bodyLeft) + targetContentPx + measurer.measurePx(bodyRight);

  const leftPercent = opts.leftPercent ?? 50; // 50=中央寄せ

  const topCenter = opts.topC ?? "";
  const botCenter = opts.botC ?? "";

  // 4) 上下線（同じ targetLinePx を使う）
  const top =
    (opts.topL === "" && opts.topR === "" && opts.top === "")
      ? ""
      : buildLineByPercent({
        targetPx: targetLinePx,
        left: opts.topL,
        center: topCenter, // ★ここ
        right: opts.topR,
        fill: opts.top,
        leftPercent: 50,
        measurer,
        minRepeat: 1,
      });

  const bottom =
    (opts.botL === "" && opts.botR === "" && opts.bot === "")
      ? ""
      : buildLineByPercent({
        targetPx: targetLinePx,
        left: opts.botL,
        center: botCenter, // ★ここ
        right: opts.botR,
        fill: opts.bot,
        leftPercent: 50,
        measurer,
        minRepeat: 1,
      });

  // 5) 本文（中央寄せも、この関数だけでやる）
  const body = lines.map((line) =>
    buildLineByPercent({
      targetPx: targetLinePx,
      left: bodyLeft,
      center: line,
      right: bodyRight,
      fill: " ",
      leftPercent,
      measurer,
      capRepeat: 120, // スペース暴走防止（好みで）
    })
  );

  const result: string[] = [];
  if (top !== "") result.push(top);
  result.push(...body);
  if (bottom !== "") result.push(bottom);

  return result.join("\n");
};
