export type TextMeasurer = {
  measurePx: (text: string) => number;
  spacePx: number;
  hPx: number;
};

type BuildLineByPercentArgs = {
  targetPx: number;
  left: string;     // 1回
  center: string;   // 1回
  right: string;    // 1回
  fill: string;     // 繰り返し
  leftPercent: number; // 0..100（左側に回す割合）
  measurer: TextMeasurer;
  capRepeat?: number;
};

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

export const buildLineByPercent = (p: BuildLineByPercentArgs): string => {
  const lp = clamp(p.leftPercent, 0, 100) / 100;

  const leftPx = p.measurer.measurePx(p.left);
  const centerPx = p.measurer.measurePx(p.center);
  const rightPx = p.measurer.measurePx(p.right);

  const fillChar = p.fill.length === 0 ? " " : p.fill;
  const fillPxRaw = p.measurer.measurePx(fillChar);
  const fillPx = Math.max(1, fillPxRaw || p.measurer.hPx || p.measurer.spacePx);

  const remainPx = Math.max(0, p.targetPx - (leftPx + centerPx + rightPx));
  const totalRepeat = clamp(Math.round(remainPx / fillPx), 0, p.capRepeat ?? 0);

  const leftRepeat = clamp(Math.round(totalRepeat * lp), 0, totalRepeat);
  const rightRepeat = totalRepeat - leftRepeat;

  return `${p.left}${fillChar.repeat(leftRepeat)}${p.center}${fillChar.repeat(rightRepeat)}${p.right}`;
};
