import { DdLogs } from 'expo-datadog';

import * as utils from '../../utils';
import { logError } from '../logError';

// ─── MOCKS ───────────────────────────────────────────────────────────────────

jest.mock('expo-constants', () => ({ appOwnership: 'NOT_EXPO_GO' }));
jest.mock('expo-device', () => ({ isDevice: true }));

jest.mock('expo-datadog', () => ({
  DdLogs: { error: jest.fn().mockImplementation(async () => {}) },
}));

// ─── TEST VALUES ─────────────────────────────────────────────────────────────

const ERROR_MSG = 'App crash';
const ERROR_CONTEXT = { message: 'test error message' };

// ─── TESTS ───────────────────────────────────────────────────────────────────

describe('logError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  describe('when called with error message and context', () => {
    it('calls datadog with arguments', async () => {
      await logError(ERROR_MSG, ERROR_CONTEXT);
      expect(DdLogs.error).toHaveBeenCalledTimes(1);
      expect(DdLogs.error).toHaveBeenCalledWith(ERROR_MSG, ERROR_CONTEXT);
    });
    it('does not error', async () => {
      await expect(logError(ERROR_MSG, ERROR_CONTEXT)).resolves.not.toThrow();
    });
  });

  describe('when called with JUST error message', () => {
    it('calls datadog with arguments', async () => {
      await logError(ERROR_MSG);
      expect(DdLogs.error).toHaveBeenCalledTimes(1);
      expect(DdLogs.error).toHaveBeenCalledWith(ERROR_MSG);
    });
    it('does not error', async () => {
      await expect(logError(ERROR_MSG)).resolves.not.toThrow();
    });
  });

  describe('when used on incompatible device', () => {
    it('returns early', async () => {
      jest
        .spyOn(utils, 'isCompatibleWithDatadogNative')
        .mockImplementation(() => false);
      await expect(logError(ERROR_MSG)).resolves.toBeUndefined();
      expect(DdLogs.error).toHaveBeenCalledTimes(0);
    });
  });
});
