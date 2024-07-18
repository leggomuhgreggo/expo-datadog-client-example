import { init } from './init';
import { logError } from './logError';
import { setGlobalAttribute } from './setGlobalAttribute';
import { setUser } from './setUser';
import { stopSession } from './stopSession';
import { trackViews } from './trackViews';

export const datadog = {
  init,
  logError,
  setGlobalAttribute,
  setUser,
  stopSession,
  trackViews,
};
