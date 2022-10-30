import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import { DdLogs } from 'expo-datadog';

import { isCompatibleWithDatadogNative } from '../utils';
import type { TrackViews } from './trackViews.types';

/**
 * Required for page view tracking on native clients (web works automatically)
 * NOTE: Call from the `NavigationContainer#onReady` should be conditioned.
 * https://www.npmjs.com/package/@datadog/mobile-react-navigation
 */
export const trackViews: TrackViews = async (currentView) => {
  if (!isCompatibleWithDatadogNative()) return;

  DdRumReactNavigationTracking.startTrackingViews(currentView);

  await DdLogs.debug('Successfully ran `trackViews` (native)');
};
