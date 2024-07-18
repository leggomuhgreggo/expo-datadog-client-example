import { datadogRum } from '@datadog/browser-rum';

import type { LogError } from './logError.types';

export const logError: LogError = async (...passThruArgs) => {
  const [error, context] = passThruArgs;

  if (typeof context === 'object') {
    datadogRum.addError(error, context);
    return;
  }

  datadogRum.addError(error);
};
