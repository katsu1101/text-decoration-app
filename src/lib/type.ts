import {TextMeasurer} from "@/lib/textDecorations";

export type Pattern = {
  id: string;
  buildMeasured: (inputText: string, measurer: TextMeasurer) => string;
};