import { DdSdkReactNative } from 'expo-datadog';

import * as utils from '../../utils';
import { setUser } from '../setUser';

// ─── MOCKS ──────────────────────────────────────────────────────────────────────

jest.mock('expo-datadog', () => ({
  DdSdkReactNative: { setUser: jest.fn().mockImplementation(async () => {}) },
}));

// ─── TEST VALUES ────────────────────────────────────────────────────────────────

const TEST_USER = { id: '1234' };

// ────────────────────────────────────────────────────────────────────────────────

describe('setUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when called WITH an ID', () => {
    it('registers user', async () => {
      jest
        .spyOn(utils, 'isCompatibleWithDatadogNative')
        .mockImplementation(() => true);

      setUser(TEST_USER.id);

      expect(DdSdkReactNative.setUser).toHaveBeenCalledTimes(1);
      expect(DdSdkReactNative.setUser).toHaveBeenCalledWith(TEST_USER);
    });
  });
  describe('when called WITHOUT an ID', () => {
    it('clears user', async () => {
      jest
        .spyOn(utils, 'isCompatibleWithDatadogNative')
        .mockImplementation(() => true);

      setUser();

      expect(DdSdkReactNative.setUser).toHaveBeenCalledTimes(1);
      expect(DdSdkReactNative.setUser).toHaveBeenCalledWith({ id: null });
    });
  });

  describe('when used on incompatible device', () => {
    it('returns early', async () => {
      jest
        .spyOn(utils, 'isCompatibleWithDatadogNative')
        .mockImplementation(() => false);

      setUser(TEST_USER.id);

      expect(DdSdkReactNative.setUser).toHaveBeenCalledTimes(0);
    });
  });
});
