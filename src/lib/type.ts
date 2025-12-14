import {TextMeasurer} from "@/lib/decorationsText";

export type Pattern = {
  id: string;
  title: string;
  buildMeasured: (inputText: string, measurer: TextMeasurer) => string;
};

export type ModeId = "jp" | "latin" | "combine";

export type ModeConfig = {
  title: string;
  example: string;
  patterns: Pattern[];
};