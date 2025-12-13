// src/lib/decorationsText.ts

type BoxOpt = {
  topLeft: string; topCenter?: string; top: string; topRight: string;
  left: string; right: string;
  bottomLeft: string; botCenter?: string; bottom: string; bottomRight: string;

  // 追加（任意）：左右のバランス(0..100)。50=中央寄せ
  leftPercent?: number;

  // 追加（任意）：ブレ吸収（半角スペース換算）
  safetySpaces?: number;
};

type BoxOptInput = Partial<BoxOpt> & Pick<BoxOpt, "left" | "right">; // l/r だけ必須にする

const defaultBoxOpt: BoxOpt = {
  topLeft: "", topCenter: "", top: "", topRight: "",
  left: "", right: "",
  bottomLeft: "", botCenter: "", bottom: "", bottomRight: "",

  leftPercent: 50,
  safetySpaces: 2,
};

const normalizeBoxOpt = (input: BoxOptInput): BoxOpt => {
  return {...defaultBoxOpt, ...input};
};

export const splitLines = (text: string): string[] => text.replace(/\r\n/g, "\n").split("\n");

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

export const makeBoxMeasured = (lines: string[], optInput: BoxOptInput, measurer: TextMeasurer): string => {
  const opts = normalizeBoxOpt(optInput);

  const spacePx = Math.max(1, measurer.spacePx);

  // 1) targetContentPx を決める（本文最大幅 + safety）
  const linePxList = lines.map((line) => measurer.measurePx(line));
  const maxLinePx = Math.max(1, ...linePxList);

  const safetySpaces = opts.safetySpaces ?? 2;
  const targetContentPx = maxLinePx + spacePx * safetySpaces;

  // 2) 本文行の固定パーツ（あなたの従来仕様：l と r の内側にスペース1個）
  const bodyLeft = `${opts.left} `;
  const bodyRight = ` ${opts.right}`;

  // 3) ここが「全行共通の目標幅(px)」
  const targetLinePx = measurer.measurePx(bodyLeft) + targetContentPx + measurer.measurePx(bodyRight);

  const leftPercent = opts.leftPercent ?? 50; // 50=中央寄せ

  const topCenter = opts.topCenter ?? "";
  const botCenter = opts.botCenter ?? "";

  // 4) 上下線（同じ targetLinePx を使う）
  const top =
    (opts.topLeft === "" && opts.topRight === "" && opts.top === "")
      ? ""
      : buildLineByPercent({
        targetPx: targetLinePx,
        left: opts.topLeft,
        center: topCenter, // ★ここ
        right: opts.topRight,
        fill: opts.top,
        leftPercent: 50,
        measurer,
        minRepeat: 1,
      });

  const bottom =
    (opts.bottomLeft === "" && opts.bottomRight === "" && opts.bottom === "")
      ? ""
      : buildLineByPercent({
        targetPx: targetLinePx,
        left: opts.bottomLeft,
        center: botCenter, // ★ここ
        right: opts.bottomRight,
        fill: opts.bottom,
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
