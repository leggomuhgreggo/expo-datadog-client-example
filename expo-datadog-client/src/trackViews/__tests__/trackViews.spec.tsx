import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import { createNavigationContainerRef } from '@react-navigation/native';
import * as utils from '../../utils';
import { trackViews } from '../trackViews';

// ─── MOCKS ──────────────────────────────────────────────────────────────────────

jest.mock('@datadog/mobile-react-navigation', () => ({
  DdRumReactNavigationTracking: { startTrackingViews: jest.fn() },
}));

jest.mock('expo-datadog', () => ({
  DdLogs: { debug: jest.fn().mockImplementation(async () => {}) },
}));

// ─── TEST VALUES ────────────────────────────────────────────────────────────────

const navigationRef = createNavigationContainerRef();

// ────────────────────────────────────────────────────────────────────────────────

describe('trackViews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls RUM tracking with arguments', () => {
    jest
      .spyOn(utils, 'isCompatibleWithDatadogNative')
      .mockImplementation(() => true);
    trackViews(navigationRef.current);

    expect(
      DdRumReactNavigationTracking.startTrackingViews,
    ).toHaveBeenCalledTimes(1);
    expect(
      DdRumReactNavigationTracking.startTrackingViews,
    ).toHaveBeenCalledWith(navigationRef.current);
  });

  describe('when used on incompatible device', () => {
    it('returns early', async () => {
      jest
        .spyOn(utils, 'isCompatibleWithDatadogNative')
        .mockImplementation(() => false);

      trackViews(navigationRef.current);
      expect(
        DdRumReactNavigationTracking.startTrackingViews,
      ).toHaveBeenCalledTimes(0);
    });
  });
});
