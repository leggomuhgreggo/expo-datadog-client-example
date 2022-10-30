import type { SdkVerbosity } from 'expo-datadog';
import type { NativeDefaultConfig, WebDefaultConfig } from './types';

/**
 * Default Configuration for Datadog
 */

// ───── NATIVE RUM DEFAULTS ──────────────────────────────────────────────────────────

// https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/

export const NATIVE_DEFAULTS: NativeDefaultConfig = {
  trackInteractions: true,
  trackResources: true,
  trackErrors: true,
  site: 'US1',
  verbosity: 'warn' as SdkVerbosity,
  nativeCrashReportEnabled: true,
  sessionSamplingRate: 100,
  resourceTracingSamplingRate: 100,
};

// ───── WEB RUM (+Logs) DEFAULTS ────────────────────────────────────────────────────────

// https://docs.datadoghq.com/real_user_monitoring/browser/
// https://docs.datadoghq.com/logs/log_collection/javascript/

export const WEB_DEFAULTS: WebDefaultConfig = {
  trackInteractions: true,
  siteParameter: 'datadoghq.com',
  sessionSamplingRate: 100,
  replaySampleRate: 100,
  trackFrustrations: true,
  silentMultipleInit: true,

  // @datadog/browser-logs
  forwardErrorsToLogs: true,
  forwardConsoleLogs: 'all',
  forwardReports: 'all',
};
