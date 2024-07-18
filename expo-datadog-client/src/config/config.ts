import type { LogsInitConfiguration as BrowserLogsConfigRaw } from '@datadog/browser-logs';
import type { RumInitConfiguration as WebConfigRaw } from '@datadog/browser-rum';
import type { DdSdkReactNativeConfiguration as NativeConfigRaw } from 'expo-datadog';
import { type SdkVerbosity } from 'expo-datadog';

// ─────────────────────────────────────────────────────────────────────────────

/**
 * ## USAGE
 * ```
 * init(
 *   config: StandardInitParams,
 *   overrides?: ClientSpecificOverrides
 * )
 * ```
 * NOTE: The initial version of this had a single params object -- but it became
 * too hard to parse a single object with all sorts of aliased / overlapped
 * stuff -- updates were a nightmare
 *
 */

// ─────────────────────────────────────────────────────────────────────────────
// ───── NATIVE RUM DEFAULTS ───────────────────────────────────────────────────

// https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/

export const NATIVE_RUM_DEFAULTS: NativeRumDefaults = {
  site: 'US1',
  trackResources: true,
  trackErrors: true,
  verbosity: 'warn' as SdkVerbosity,
  nativeCrashReportEnabled: true,
  sessionSamplingRate: 100,
  resourceTracingSamplingRate: 100,
  trackInteractions: true, // called `trackUserInteractions` in browser RUM
  telemetrySampleRate: 100, // shared
  trackFrustrations: true, // enabled by default now, in browser RUM
};
type NativeRumDefaults = Omit<Partial<NativeConfigNormalized>, InitParamKeys>;

// ─────────────────────────────────────────────────────────────────────────────
// ───── WEB RUM (+Logs) DEFAULTS ──────────────────────────────────────────────

// https://docs.datadoghq.com/real_user_monitoring/browser/

export const WEB_RUM_DEFAULTS: WebRumDefaults = {
  site: 'datadoghq.com',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  silentMultipleInit: true,
  trackUserInteractions: true, // called `trackInteractions` in React Native RUM config
  telemetrySampleRate: 100, // shared
  defaultPrivacyLevel: 'mask-user-input',
};
type WebRumDefaults = Omit<Partial<WebConfigNormalized>, InitParamKeys>;

// https://docs.datadoghq.com/logs/log_collection/javascript/

export const WEB_LOGS_DEFAULTS: WebLogsDefaults = {
  forwardErrorsToLogs: true,
  forwardConsoleLogs: 'all',
  forwardReports: 'all',
};
type WebLogsDefaults = Omit<
  Partial<BrowserLogsConfigNormalized>,
  InitParamKeys
>;

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

export type InitFn = (
  p1: StandardInitParams,
  p2?: ClientSpecificOverrides,
) => Promise<void>;

/** Standard Init Params */
export type RequiredInitParamKeys =
  | 'clientToken'
  | 'env'
  | 'applicationId'
  | 'version'
  | 'serviceName';
export type OptionalInitParamKeys = 'versionSuffix'; // this is a concept in RUM native, but not in web -- so we map + interpolate along with version, for web
export type InitParamKeys = RequiredInitParamKeys | OptionalInitParamKeys;

export type StandardInitParams =
  | StandardInitParamsWeb
  | StandardInitParamsNative;

export type StandardInitParamsWeb = Partial<
  Pick<WebConfigNormalized, OptionalInitParamKeys>
> &
  Required<Pick<WebConfigNormalized, RequiredInitParamKeys>>;
export type StandardInitParamsNative = Partial<
  Pick<NativeConfigNormalized, OptionalInitParamKeys>
> &
  Required<Pick<WebConfigNormalized, RequiredInitParamKeys>>;

/** ClientSpecificOverrides */
export type ClientSpecificOverrides = Readonly<{
  rumNative?: Partial<NativeConfigRaw>;
  rumWeb?: Partial<WebConfigRaw>;
  logsWeb?: Partial<BrowserLogsConfigRaw>;
}>;

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// ───── Normalized Types ──────────────────────────────────────────────────────

// # NATIVE RUM
// For native, we have to "normalize" the types, because of the goofy way that
// DdSdkReactNativeConfiguration is using Class -- specifically the default
// values are typed as required

// 1. Reset so that every field is optional
type ResetNativeConfig = Partial<NativeConfigRaw>;
// 2. Ensure specified fields are required
export type NativeConfigNormalized = WithRequired<
  ResetNativeConfig,
  RequiredInitParamKeys
>;

// ────────────────────────────────────────────────

// # WEB RUM
// For web we just have to alias, to match the native schema + add versionSuffix
export type WebConfigNormalized = AliasKeys<
  Readonly<{ service: 'serviceName' }>, // de-aliased later
  WebConfigRaw
> &
  Readonly<{ versionSuffix?: string }>;

// # WEB LOGS
// Same for the browser logs
export type BrowserLogsConfigNormalized = AliasKeys<
  Readonly<{ service: 'serviceName' }>, // de-aliased later
  BrowserLogsConfigRaw
> &
  Readonly<{ versionSuffix?: string }>;

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ─── TYPE UTILS ──────────────────────────────────────────────────────────────────

type AliasKeys<T, U> = {
  readonly [K in keyof U as K extends keyof T
    ? T[K] extends string
      ? T[K]
      : never
    : K]: K extends keyof U ? U[K] : never;
};

type WithRequired<Type, Key extends keyof Type> = Type & {
  readonly [Property in Key]-?: Type[Property];
};
