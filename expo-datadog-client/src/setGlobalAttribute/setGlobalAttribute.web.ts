import { datadogRum as WebDatadogRum } from "@datadog/browser-rum";
import type { SetGlobalAttr } from "./setGlobalAttribute.types";

export const setGlobalAttribute: SetGlobalAttr = async (scopeKey, value) => {
  return new Promise((resolve) => {
    WebDatadogRum.setGlobalContextProperty(scopeKey, value);
    resolve();
  });
};
