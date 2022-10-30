import { datadogRum } from '@datadog/browser-rum';

import type { LogError } from './logError.types';

// simple alias is all that's needed for web
export const logError: LogError = async (...passThruArgs) => {
  return new Promise((resolve) => {
    datadogRum.addError(...passThruArgs);
    resolve();
  });
};
