import { isRunningInExpoGo } from "expo";
import { vexo } from "vexo-analytics";

export const initVexo = async () => {
  if (__DEV__ || isRunningInExpoGo()) {
    return;
  }

  const vexoApiKey = process.env.EXPO_PUBLIC_VEXO_API_KEY;

  if (!vexoApiKey) {
    throw new Error("Missing env var: EXPO_PUBLIC_VEXO_API_KEY");
  }

  vexo(vexoApiKey);
};
