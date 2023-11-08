import type { LogsInitConfiguration } from '@datadog/browser-logs';
import { datadogLogs } from '@datadog/browser-logs';
import type { RumInitConfiguration as WebConfigRaw } from '@datadog/browser-rum';
import { datadogRum } from '@datadog/browser-rum';

import type { ClientSpecificOverrides, StandardInitParams } from '../config';
import { WEB_LOGS_DEFAULTS, WEB_RUM_DEFAULTS } from '../config';

// ─────────────────────────────────────────────────────────────────────────────

export const init = async (
  options: StandardInitParams,
  overrides?: ClientSpecificOverrides,
) => {
  // ───────────────────────────────────
  // ── RUM ────────────────────────────
  const rumOptions = normalizeRumOptions(options, overrides?.rumWeb);

  datadogRum.init(rumOptions);

  // Note: we might want to get smarter about this, with kiosk sessions
  datadogRum.startSessionReplayRecording();

  // ───────────────────────────────────
  // ── LOGS ───────────────────────────

  const logsOptions = normalizeLogsOptions(options, overrides?.logsWeb);

  datadogLogs.init(logsOptions);

  // ───────────────────────────────────
  // ───────────────────────────────────

  // @REVIEW: revisit to see whether we want to enhance this in some way
  // eslint-disable-next-line functional/immutable-data, unicorn/prefer-add-event-listener
  window.onerror = function (message, source, lineno, colno, error) {
    datadogLogs.logger.error(error?.message ?? '', {
      error: { stack: error?.stack },
    });
  };

  datadogLogs.logger.debug('Successfully ran `init` (web)');
};

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// ── Normalize Helpers ────────────────────────────────────────────────────────

function normalizeRumOptions(
  standardInitParams: StandardInitParams,
  rumOverrides?: ClientSpecificOverrides['rumWeb'],
): WebConfigRaw {
  const optionsWithOverrides = {
    ...WEB_RUM_DEFAULTS,
    ...standardInitParams,
    ...rumOverrides,
  };

  return deAliasServiceName(interpolateVersionSuffix(optionsWithOverrides));
}

// ─────────────────────────

function normalizeLogsOptions(
  standardInitParams: StandardInitParams,
  logsOverrides?: ClientSpecificOverrides['logsWeb'],
): LogsInitConfiguration {
  // appId doesn't apply to browser logs
  const { applicationId, ...standard } = standardInitParams; // eslint-disable-line @typescript-eslint/no-unused-vars

  const optionsWithOverrides = {
    ...WEB_LOGS_DEFAULTS,
    ...standard,
    ...logsOverrides,
  };

  return deAliasServiceName(interpolateVersionSuffix(optionsWithOverrides));
}

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// ── Utils ────────────────────────────────────────────────────────────────────

type MaybeVersionOpts = Readonly<{
  version?: string;
  versionSuffix?: string;
}>;
function interpolateVersionSuffix<T extends MaybeVersionOpts>(options: T) {
  const { version: versionBase, versionSuffix, ...rest } = options;

  return {
    ...rest,
    version: versionSuffix ? `${versionBase}-${versionSuffix}` : versionBase,
  };
}
// ───────────────────────────

type MaybeServiceName = Readonly<{ serviceName?: string }>;
function deAliasServiceName<T extends MaybeServiceName>(options: T) {
  const { serviceName, ...rest } = options;

  return { ...rest, service: serviceName };
}
