export type { DatadogConfigInit } from './config';

import { init } from './init';
import { logError } from './logError';
import { setGlobalAttribute } from './setGlobalAttribute';
import { setUser } from './setUser';
import { trackViews } from './trackViews';

export const datadog = {
  init,
  logError,
  setGlobalAttribute,
  setUser,
  trackViews,
};
