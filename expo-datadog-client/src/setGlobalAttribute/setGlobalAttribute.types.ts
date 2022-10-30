/**
 * `setGlobalAttribute`
 *
 * NOTE: the `@datadog/browser-rum` method interface is split into two arguments
 * to encourage scoping of attributes. Native allows you to set any old object
 * to the context root. We opted to use web's scoped convention.
 *
 * The name, `setGlobalAttribute`, aliases the underlying methods:
 * - web: `setGlobalContextProperty`
 * - native: `setAttributes`
 *
 * Additional Consideration: Standard Datadog Attributes
 * https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#user-related-attributes
 *
 * ----
 *
 * ### Web Example
 * https://docs.datadoghq.com/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#add-global-context-property
 * ```
 * datadogRum.setGlobalContextProperty('activity', {
 *   hasPaid: true,
 *   amount: 23.42
 * });
 * ```
 *
 * ### Native Example
 * https://docs.datadoghq.com/real_user_monitoring/reactnative/#global-attributes
 *
 * ```
 * DdSdkReactNative.setAttributes({
 *     profile_mode: 'wall',
 *     chat_enabled: true,
 *     campaign_origin: 'example_ad_network'
 * });
 * ```
 *
 */

export type SetGlobalAttr = (scope: string, value: JSONValue) => Promise<void>;

// ─── UTILITY TYPES ───────────────────────────────────────────────────────────

type JSONValue =
  | string
  | number
  | boolean
  | null
  | readonly JSONValue[]
  | { readonly [key: string]: JSONValue };
