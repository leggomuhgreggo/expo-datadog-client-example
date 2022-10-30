import { DdSdkReactNative as NativeDatadogRum } from "expo-datadog";
import type { SetGlobalAttr } from "./setGlobalAttribute.types";

export const setGlobalAttribute: SetGlobalAttr = async (scopeKey, value) => {
  return NativeDatadogRum.setAttributes({ [scopeKey]: value });
};
