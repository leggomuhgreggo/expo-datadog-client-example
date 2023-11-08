import { DdLogs } from 'expo-datadog';

import { isCompatibleWithDatadogNative } from '../utils';
import type { LogError } from './logError.types';

export const logError: LogError = async (...passThruArgs) => {
  if (!isCompatibleWithDatadogNative()) return;

  await DdLogs.error(...passThruArgs);
};
