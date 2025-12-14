import {applyLatinStyle} from "@/lib/decorationsLatin"
import {ModeConfig}      from "@/lib/type";

export const latinModeConfig: ModeConfig = {
  title: "英字デコ",
  example: "Tojou Linca",
  patterns: [

    {
      id: "latin_bold", title: "太字",
      buildMeasured: (t) => applyLatinStyle(t, "bold")
    },
    {
      id: "latin_italic", title: "斜体",
      buildMeasured: (t) => applyLatinStyle(t, "italic")
    },
    {
      id: "latin_bold_italic", title: "太斜体",
      buildMeasured: (t) => applyLatinStyle(t, "boldItalic")
    },
    {
      id: "latin_blackboard", title: "黒板太字",
      buildMeasured: (t) => applyLatinStyle(t, "doubleStruck")
    },
    {
      id: "latin_sans_bold", title: "ゴシック太字",
      buildMeasured: (t) => applyLatinStyle(t, "sansBold")
    },

    {
      id: "latin_circled", title: "丸囲み",
      buildMeasured: (t) => applyLatinStyle(t, "circled")
    },
    {
      id: "latin_squared", title: "四角囲み",
      buildMeasured: (t) => applyLatinStyle(t, "squared")
    },
    {
      id: "latin_smallcaps", title: "小さい文字",
      buildMeasured: (t) => applyLatinStyle(t, "smallcaps")
    },
    {
      id: "latin_parenthesized", title: "括弧",
      buildMeasured: (t) => applyLatinStyle(t, "parenthesized")
    },

    {
      id: "latin_spaced", title: "隙間あけ",
      buildMeasured: (t) => t.replace(/[A-Za-z0-9]/g, (c) => `${c} `).trimEnd()
    },
    {
      id: "latin_mono", title: "等幅",
      buildMeasured: (t) => applyLatinStyle(t, "monospace")
    },

    {
      id: "latin_underline",
      title: "下線",
      buildMeasured: (t) => applyLatinStyle(t, "underlineCombining")
    },
    {
      id: "latin_strike",
      title: "取り消し線",
      buildMeasured: (t) => applyLatinStyle(t, "strikeCombining")
    },
  ],
};
