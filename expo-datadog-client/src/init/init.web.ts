import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';

import type { DatadogConfigInit } from '../config';
import { WEB_DEFAULTS } from '../config';

export const init = async (options: DatadogConfigInit) => {
  const opts = {
    ...WEB_DEFAULTS,
    ...options,
  };

  datadogRum.init({
    clientToken: opts.clientToken,
    applicationId: opts.applicationId,
    env: opts.env,
    service: options.serviceName, // alias
    allowedTracingOrigins: opts.firstPartyHosts, // alias
    site: opts.siteParameter, // alias
    sampleRate: opts.sessionSamplingRate, // alias
    trackInteractions: opts.trackInteractions,
    version: opts.version,
    replaySampleRate: options.replaySampleRate,
  });

  datadogRum.startSessionReplayRecording();

  // NOTE: this is web only
  datadogLogs.init({
    clientToken: options.clientToken,
    env: options.env,
    version: opts.version,
    sampleRate: opts.sessionSamplingRate,
    forwardErrorsToLogs: opts.forwardErrorsToLogs,
    forwardConsoleLogs: opts.forwardConsoleLogs,
    forwardReports: opts.forwardReports,
  });

  datadogLogs.logger.debug('Successfully ran `init` (web)');
};
