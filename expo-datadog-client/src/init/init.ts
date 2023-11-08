import { DdSdkReactNative, DdSdkReactNativeConfiguration } from 'expo-datadog';

import type { InitFn } from '../config';
import { NATIVE_RUM_DEFAULTS } from '../config';
import { isCompatibleWithDatadogNative } from '../utils';

export const init: InitFn = async (options, overrides) => {
  if (!isCompatibleWithDatadogNative()) return;

  // ────────────────────────────────────────────────────────────────────────────────

  const mergedOptions = {
    ...NATIVE_RUM_DEFAULTS,
    ...options,
    ...overrides?.rumNative,
  };

  // ────────────────────────────────────────────────────────────────────────────────

  const {
    // ordered arguments to DdSdkReactNativeConfiguration
    clientToken,
    env,
    applicationId,
    trackInteractions,
    trackResources,
    trackErrors,

    // this is applied after configuration has been initialized
    ...postInitConfig
  } = mergedOptions;

  // ────────────────────────────────────────────────────────────────────────────────

  // The RN datadog config is initialized with selected options, passed to a constructor as ordered arguments
  const config = new DdSdkReactNativeConfiguration(
    clientToken,
    env,
    applicationId,
    trackInteractions,
    trackResources,
    trackErrors,
  );

  // ────────────────────────────────────────────────────────────────────────────────

  await DdSdkReactNative.initialize({
    ...config,
    ...filterNullishEntries(postInitConfig),
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// ──── Utils ────────────────────────────────────────────────────────────────────

function filterNullishEntries(obj: Record<string, unknown>) {
  return Object.entries(obj).reduce((acc, [key, val]) =>
    val ? { ...acc, [key]: val } : acc,
  );
}
