import type { DdSdkReactNativeConfiguration as DDNativeConfigRaw } from 'expo-datadog';
import type { RumInitConfiguration as DDWebConfigRaw } from '@datadog/browser-rum';
import type { LogsInitConfiguration } from '@datadog/browser-logs';

export type NativeDefaultConfig = RequiredNotNull<
  Pick<
    CustomNativeConfig,
    | 'trackInteractions'
    | 'trackResources'
    | 'trackErrors'
    | 'site'
    | 'verbosity'
    | 'nativeCrashReportEnabled'
    | 'sessionSamplingRate'
    | 'resourceTracingSamplingRate'
  >
>;

export type WebDefaultConfig = RequiredNotNull<
  Pick<
    CustomWebConfig,
    | 'trackInteractions'
    | 'siteParameter'
    | 'sessionSamplingRate'
    | 'replaySampleRate'
    | 'trackFrustrations'
    | 'silentMultipleInit'

    // @datadog/browser-logs
    | 'forwardErrorsToLogs'
    | 'forwardConsoleLogs'
    | 'forwardReports'
  >
>;

// The point of all this spaghetti is to: (a) normalize shared config; and (b)
// ensure that any config differences are *exclusive* to the platform

// - Adjust Raw Config Types
// - SharedConfig - options that are common to both
// - AliasedConfig -
// - NativeOnlyConfig;
// - WebOnlyConfig;

// ────────────────────────────────────────────────────────────────────────────────

type RequiredFields = 'clientToken' | 'env' | 'applicationId';

// ────────────────────────────────────────────────────────────────────────────────
// ─── Prep Raw Config Defs w/ Adjustments ────────────────────────────────────────

// ## Native Mods - fixing required fields, because the RN TS defs are goofed
type OptionalNativeKeys =
  | 'trackingConsent'
  | 'nativeViewTracking'
  | 'firstPartyHosts'
  | 'additionalConfig';

type RequiredNativeKeys = RequiredFields | 'serviceName';

type DDNativeConfigMod = Omit<
  DDNativeConfigRaw,
  OptionalNativeKeys | RequiredNativeKeys
> &
  Partial<Pick<DDNativeConfigRaw, OptionalNativeKeys>> &
  RequiredNotNull<Pick<DDNativeConfigRaw, RequiredNativeKeys>>;

// ## Web Mods - omitting aliased keys
type AliasedWebKeys =
  | 'site'
  | 'sampleRate'
  | 'allowedTracingOrigins'
  | 'service';
type WebConfigOmitAliases = Omit<DDWebConfigRaw, AliasedWebKeys>;

// ────────────────────────────────────────────────────────────────────────────────

/**
 * These are all mapped back to the expected values from the web init function
 * - slightly different names, but mean the same
 * - same name, but use alt values
 * */

export type WebToRNAliasConfig = {
  // RN deprecated sampleRate, and there are a bunch of rate configs, so this is more specific
  readonly sessionSamplingRate?: DDWebConfigRaw['sampleRate'];
  // insanely RN modified one of the core tags
  readonly serviceName?: DDWebConfigRaw['service'];
  // Unlike the others this isn't aliasing to a key in the RN config, this is just to distinguish `site` for web, because of a conflict in how site is indexed between the different libs
  readonly siteParameter?: DDWebConfigRaw['site'];
  // In web this is called allowedTracingOrigins and it conveniently accepts a regex instead of an array -- but least common denominator
  readonly firstPartyHosts?: DDNativeConfigMod['firstPartyHosts']; //
};

// ────────────────────────────────────────────────────────────────────────────────

type CommonConfig = Common<WebConfigOmitAliases, DDNativeConfigMod>;

export type SharedConfig = Omit<CommonConfig, RequiredFields> &
  RequiredNotNull<Pick<CommonConfig, RequiredFields>>;

// ────────────────────────────────────────────────────────────────────────────────

export type NativeOnlyConfig = Omit<DDNativeConfigMod, keyof SharedConfig>;
export type WebOnlyConfig = Omit<WebConfigOmitAliases, keyof SharedConfig>;
export type LogsOnlyConfig = Omit<LogsInitConfiguration, keyof WebOnlyConfig>;

// ────────────────────────────────────────────────────────────────────────────────

export type CustomNativeConfig = SharedConfig & NativeOnlyConfig;
export type CustomWebConfig = SharedConfig &
  WebToRNAliasConfig &
  WebOnlyConfig &
  LogsOnlyConfig;

// ────────────────────────────────────────────────────────────────────────────────

type DatadogConfigInitWeb = Partial<
  Pick<CustomWebConfig, keyof WebDefaultConfig>
> &
  Omit<CustomWebConfig, keyof WebDefaultConfig>;

type DatadogConfigInitNative = Partial<
  Pick<CustomNativeConfig, keyof NativeDefaultConfig>
> &
  Omit<CustomNativeConfig, keyof NativeDefaultConfig>;

export type DatadogConfigInit = DatadogConfigInitWeb & DatadogConfigInitNative;

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ─── TYPE UTILS ──────────────────────────────────────────────────────────────────

type Common<A, B> = {
  readonly [P in keyof A & keyof B]: A[P] | B[P];
};
export type RequiredNotNull<T> = {
  readonly [P in keyof T]: NonNullable<T[P]>;
};
