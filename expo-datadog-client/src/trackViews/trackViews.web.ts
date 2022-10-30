import { datadogLogs } from '@datadog/browser-logs';
import type { TrackViews } from './trackViews.types';

/**
 * This is a shim and exists as a fallback.
 * The native `trackViews` should be conditioned from the NavigationContainer
 */
export const trackViews: TrackViews = async () => {
  return new Promise<void>((resolve) => {
    datadogLogs.logger.warn(
      'Datadog tracking is supported by default in web. Add platform conditioning around this method to avoid this warning',
    );
    resolve();
  });
};
