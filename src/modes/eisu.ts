import {applyEisuStyle, toScriptBold} from "@/lib/decorationsEisu"
import {ModeConfig}                    from "@/lib/type";

export const eisuModeConfig: ModeConfig = {
  title: "英字デコ",
  example: "Tojou Linca",
  patterns: [

    {
      id: "eisu_bold", title: "太字",
      buildMeasured: (t) => applyEisuStyle(t, "bold")
    },
    {
      id: "eisu_italic", title: "斜体",
      buildMeasured: (t) => applyEisuStyle(t, "italic")
    },
    {
      id: "eisu_bold_italic", title: "太斜体",
      buildMeasured: (t) => applyEisuStyle(t, "boldItalic")
    },
    {
      id: "eisu_blackboard", title: "黒板太字",
      buildMeasured: (t) => applyEisuStyle(t, "doubleStruck")
    },
    {
      id: "eisu_script_bold",
      title: "筆記体",
      buildMeasured: (t) => toScriptBold(t),
    },
    {
      id: "eisu_sans_bold", title: "ゴシック太字",
      buildMeasured: (t) => applyEisuStyle(t, "sansBold")
    },

    {
      id: "eisu_circled", title: "丸囲み",
      buildMeasured: (t) => applyEisuStyle(t, "circled")
    },
    {
      id: "eisu_squared", title: "四角囲み",
      buildMeasured: (t) => applyEisuStyle(t, "squared")
    },
    {
      id: "eisu_smallcaps", title: "小さい文字",
      buildMeasured: (t) => applyEisuStyle(t, "smallcaps")
    },
    {
      id: "eisu_parenthesized", title: "括弧",
      buildMeasured: (t) => applyEisuStyle(t, "parenthesized")
    },

    {
      id: "eisu_spaced", title: "隙間あけ",
      buildMeasured: (t) => t.replace(/[A-Za-z0-9]/g, (c) => `${c} `).trimEnd()
    },
    {
      id: "eisu_mono", title: "等幅",
      buildMeasured: (t) => applyEisuStyle(t, "monospace")
    },

    {
      id: "eisu_underline",
      title: "下線",
      buildMeasured: (t) => applyEisuStyle(t, "underlineCombining")
    },
    {
      id: "eisu_strike",
      title: "取り消し線",
      buildMeasured: (t) => applyEisuStyle(t, "strikeCombining")
    },

  ]
};
