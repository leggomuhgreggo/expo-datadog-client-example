/* eslint-disable functional/immutable-data */

import { DdSdkReactNative, DdSdkReactNativeConfiguration } from 'expo-datadog';

import { isCompatibleWithDatadogNative } from '../utils';
import { NATIVE_DEFAULTS } from '../config/config';
import type { DatadogConfigInit } from '../config/types';

export const init = async (options: DatadogConfigInit) => {
  if (!isCompatibleWithDatadogNative()) return;

  // ────────────────────────────────────────────────────────────────────────────────

  const opts = {
    ...NATIVE_DEFAULTS,
    ...options,
  };

  // ────────────────────────────────────────────────────────────────────────────────

  // The RN datadog config is initialized with selected options, passed to a constructor as ordered arguments
  const config = new DdSdkReactNativeConfiguration(
    opts.clientToken,
    opts.env,
    opts.applicationId,
    opts.trackInteractions,
    opts.trackResources,
    opts.trackErrors,
  );

  // ────────────────────────────────────────────────────────────────────────────────

  // Additional options are defined after the config object is initialized
  opts.serviceName && (config.serviceName = opts.serviceName);
  opts.site && (config.site = opts.site);
  opts.verbosity && (config.verbosity = opts.verbosity);
  opts.nativeCrashReportEnabled &&
    (config.nativeCrashReportEnabled = opts.nativeCrashReportEnabled);
  opts.sessionSamplingRate &&
    (config.sessionSamplingRate = opts.sessionSamplingRate);
  opts.resourceTracingSamplingRate &&
    (config.resourceTracingSamplingRate = opts.resourceTracingSamplingRate);
  opts.firstPartyHosts && (config.firstPartyHosts = opts.firstPartyHosts);

  // ────────────────────────────────────────────────────────────────────────────────

  return DdSdkReactNative.initialize(config);
};
