// src/lib/uiTheme.ts

export type TextInputTheme = {
  labelClass: string;
  subLabelClass: string;
  textareaClass: string;
  hintClass: string;
};

export type PatternGridTheme = {
  cardClass: string;
  badgeClass: string;
  previewClass: string;
};

export type ToastTheme = {
  toastClass: string;
};

export type PageTheme = {
  pageBackgroundClass: string;
  textInput: TextInputTheme;
  patternGrid: PatternGridTheme;
  toast: ToastTheme;
};

export const defaultPageTheme: PageTheme = {
  pageBackgroundClass: "bg-gradient-to-br from-slate-50 via-indigo-50 to-emerald-50",
  textInput: {
    labelClass: "text-slate-700",
    subLabelClass: "text-slate-500",
    textareaClass:
      "bg-white border-slate-200 placeholder:text-slate-400 text-slate-800 focus:border-indigo-300 focus:ring-indigo-200/50",
    hintClass: "text-slate-500",
  },
  patternGrid: {
    cardClass:
      "bg-white/70 border-slate-200/80 hover:shadow-md focus:ring-indigo-200/50",
    badgeClass:
      "border-indigo-200/80 bg-white/80 text-indigo-500",
    previewClass:
      "border-slate-200 bg-slate-50/70 text-slate-800",
  },
  toast: {
    toastClass:
      "border-slate-200 bg-white/85 text-slate-700",
  },
};
