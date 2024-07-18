import { DdSdkReactNative } from 'expo-datadog';

import { isCompatibleWithDatadogNative } from '../utils';
import type { SetUser } from './setUser.types';
/**
 * Registers user to datadog session. Used in post login / logout callback
 *
 * NOTE: Security has advised that we shouldn't register PII (like email),
 * **unless there is a compelling reason**. So that's why it's just `id`.
 */

export const setUser: SetUser = async (id) => {
  if (!isCompatibleWithDatadogNative()) return;

  if (typeof id === 'string' && id?.length > 0) {
    return registerUser(id);
  }

  return clearUser();
};

// ────────────────────────────────────────────────────────────────────────────────

const registerUser = async (id: string) => {
  return DdSdkReactNative.setUser({ id });
};

const clearUser = async () => {
  return DdSdkReactNative.setUser({ id: undefined });
};
