import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

import type { SetUser } from './setUser.types';

/**
 * Registers user to datadog session. Used in post login / logout callback
 *
 * NOTE: Security has advised that we shouldn't register PII (like email),
 * **unless there is a compelling reason**. So that's why it's just `id`.
 */
export const setUser: SetUser = async (id) => {
  if (id && typeof id === 'string' && id?.length > 0) {
    await registerUserSession(id);

    return;
  }

  await clearUserSession();
};
// ────────────────────────────────────────────────────────────────────────────────

const registerUserSession = async (id: string) => {
  return new Promise<void>((resolve) => {
    datadogRum?.setUser?.({ id });
    datadogLogs.logger.debug('Successfully ran `setUser` (web)');
    resolve();
  });
};

const clearUserSession = async () => {
  return new Promise<void>((resolve) => {
    datadogRum?.clearUser();
    datadogLogs.logger.debug('Successfully ran `clearUser` (web)');
    resolve();
  });
};
