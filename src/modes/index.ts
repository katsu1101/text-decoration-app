import {ModeConfig, ModeId} from "@/lib/type";
import {jpModeConfig}       from "@/modes/waku";
import {moriModeConfig}  from "./mori";
import {eisuModeConfig}    from "./eisu";

export const modeConfigMap: Record<ModeId, ModeConfig> = {
  waku: jpModeConfig,
  eisu: eisuModeConfig,
  mori: moriModeConfig,
} as const;
