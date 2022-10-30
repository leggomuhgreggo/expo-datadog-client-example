import { DdSdkReactNative } from 'expo-datadog';
import * as utils from '../../utils';

import { init } from '../init';

// ─── MOCKS ──────────────────────────────────────────────────────────────────────

jest.mock('expo-datadog', () => ({
  DdSdkReactNative: {
    initialize: jest.fn().mockImplementation(async () => {}),
  },
  DdSdkReactNativeConfiguration: jest.fn().mockImplementation(() => {
    return {};
  }),
}));

// ─── TEST VALUES ────────────────────────────────────────────────────────────────

const CONFIG = {
  applicationId: 'DD_RUM_APPLICATION_ID',
  clientToken: 'DD_RUM_CLIENT_TOKEN',
  env: 'DD_RUM_ENVIRONMENT',
  version: 'APP_VERSION',
};

// ────────────────────────────────────────────────────────────────────────────────

describe('init', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when called with basic config', () => {
    it('registers user', async () => {
      jest
        .spyOn(utils, 'isCompatibleWithDatadogNative')
        .mockImplementation(() => true);

      await init(CONFIG);

      expect(DdSdkReactNative.initialize).toHaveBeenCalledTimes(1);
    });
  });

  describe('when config includes firstPartyHosts', () => {
    it('registers user', async () => {
      jest
        .spyOn(utils, 'isCompatibleWithDatadogNative')
        .mockImplementation(() => true);

      await init({ ...CONFIG, firstPartyHosts: [] });

      expect(DdSdkReactNative.initialize).toHaveBeenCalledTimes(1);
    });
  });
  describe('when used on incompatible device', () => {
    it('returns early', async () => {
      jest
        .spyOn(utils, 'isCompatibleWithDatadogNative')
        .mockImplementation(() => false);

      await init(CONFIG);

      expect(DdSdkReactNative.initialize).toHaveBeenCalledTimes(0);
    });
  });
});
