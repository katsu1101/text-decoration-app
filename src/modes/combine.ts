import {applyLatinStyle} from "@/lib/decorationsLatin";
import {ModeConfig}      from "@/lib/type";

export const combineModeConfig: ModeConfig = {
  title: "",
  example: "Tojou Linca kawaii",
  patterns: [
    {
      id: "latin_underline",
      title: "下線",
      buildMeasured: (t) => applyLatinStyle(t, "underlineCombining")
    },
    {
      id: "latin_strike",
      title: "ストライク",
      buildMeasured: (t) => applyLatinStyle(t, "strikeCombining")
    },
  ],
}


type DiacriticButton = Readonly<{
  id: string;
  title: string;
  marks: string[];
  sample: string;
}>;

type DiacriticGroup = Readonly<{
  id: string;
  label: string;
  description?: string;
  buttons: readonly DiacriticButton[];
}>;


export const DIACRITIC_GROUPS: readonly DiacriticGroup[] = [
  {
    id: "top",
    label: "上につく",
    description: "見た目が安定しやすく、飾りとして使いやすい",
    buttons: [
      {id: "macron", title: "マクロン（Ā）", marks: ["\u0304"], sample: "Ā"},
      {id: "acute", title: "アキュート（Á）", marks: ["\u0301"], sample: "Á"},
      {id: "grave", title: "グレイヴ（À）", marks: ["\u0300"], sample: "À"},
      {id: "circumflex", title: "ハット（Â）", marks: ["\u0302"], sample: "Â"},
      {id: "tilde", title: "チルダ（Ã）", marks: ["\u0303"], sample: "Ã"},
      {id: "diaeresis", title: "ウムラウト（Ä）", marks: ["\u0308"], sample: "Ä"},
      {id: "ring", title: "リング（Å）", marks: ["\u030A"], sample: "Å"},
      {id: "dotAbove", title: "ドット（Ȧ）", marks: ["\u0307"], sample: "Ȧ"},
      {id: "caron", title: "ハーチェク（Č）", marks: ["\u030C"], sample: "Č"},
    ],
  },
  {
    id: "bottom",
    label: "下や全体につく",
    description: "呪い感・重さが出る（環境差は少し増える）",
    buttons: [
      {id: "dotBelow", title: "ドット下（ạ）", marks: ["\u0323"], sample: "ạ"},
      {id: "cedilla", title: "セディーユ（Ç）", marks: ["\u0327"], sample: "Ç"},
      {id: "ogonek", title: "フック（Ą）", marks: ["\u0328"], sample: "Ą"},

      {id: "strikeComb", title: "傷（̶）", marks: ["\u0336"], sample: "̶"},
      {id: "slashComb", title: "スラッシュ（̸）", marks: ["\u0338"], sample: "̸"},
    ],
  },
  {
    id: "set",
    label: "セット",
    description: "組み合わせで面白い形に！",
    buttons: [
      {id: "cute_sparkle", sample: "✨", title: "きらきら", marks: ["\u0308", "\u0307"]}, // ̈ ̇
      {id: "cute_wavy", sample: "🌸", title: "ふわゆら", marks: ["\u0303", "\u0307"]}, // ̃ ̇
      {id: "cute_chic", sample: "🎀", title: "おしゃれ", marks: ["\u0302", "\u0308"]}, // ̂ ̈

      {id: "crown", sample: "👑", title: "王冠", marks: ["\u0302", "\u030A", "\u0307"]}, // ̂ ̊ ̇
      {id: "antenna", sample: "📡", title: "アンテナ", marks: ["\u0304", "\u0303"]},       // ̄ ̃
      {id: "curse", sample: "🕯️", title: "呪い", marks: ["\u0323", "\u0331", "\u0324"]},  // ̣ ̱ ̤
      {id: "glitch", sample: "👾", title: "グリッチ", marks: ["\u0336", "\u0338", "\u0303"]}, // ̶ ̸ ̃
    ]
  },
] as const;
