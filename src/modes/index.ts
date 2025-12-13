import {ModeConfig, ModeId} from "@/lib/type";
import {combineModeConfig}  from "./combine";
import {jpModeConfig}       from "./jp";
import {latinModeConfig}    from "./latin";

export const modeConfigMap: Record<ModeId, ModeConfig> = {
  jp: jpModeConfig,
  latin: latinModeConfig,
  combine: combineModeConfig,
} as const;
