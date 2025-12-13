import {Pattern} from "@/lib/type";

export const patterns: Pattern[] = [
  {
    id: "latin_caps",
    buildMeasured: (t) => t.toUpperCase(),
  },
  {
    id: "latin_spaced",
    buildMeasured: (t) => t.replace(/[A-Za-z0-9]/g, (c) => `${c} `).trimEnd(),
  },
];
