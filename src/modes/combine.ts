import {applyLatinStyle} from "@/lib/decorationsLatin";
import {ModeConfig}      from "@/lib/type";

export const combineModeConfig: ModeConfig = {
  title: "",
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
  examples: [
    "New drop ✨\ncheck it out!",
    "Thank you!\nsee you next live",
    "Coming soon\nstay tuned",
  ]
}