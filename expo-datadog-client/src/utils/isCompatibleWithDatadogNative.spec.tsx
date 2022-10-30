/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */

// Mocking technique
// https://medium.com/trabe/mocking-different-values-for-the-same-module-using-jest-a7b8d358d78b

describe('isCompatibleWithDatadogNative', () => {
  beforeEach(() => jest.resetModules());
  describe('when NOT ExpoGo && NOT Simulator', () => {
    it('returns true', () => {
      jest.mock('expo-device', () => ({ isDevice: true }));
      jest.mock('expo-constants', () => ({ appOwnership: 'standalone' }));

      const {
        isCompatibleWithDatadogNative,
      } = require('./isCompatibleWithDatadogNative');

      const value = isCompatibleWithDatadogNative();

      expect(value).toBe(true);
    });
  });

  describe('when NOT ExpoGo && IS Simulator', () => {
    it('returns false', () => {
      jest.mock('expo-device', () => ({ isDevice: false }));
      jest.mock('expo-constants', () => ({ appOwnership: 'standalone' }));

      const {
        isCompatibleWithDatadogNative,
      } = require('./isCompatibleWithDatadogNative');

      const value = isCompatibleWithDatadogNative();

      expect(value).toBe(false);
    });
  });

  describe('when IS ExpoGo && IS Simulator', () => {
    it('returns false', () => {
      jest.mock('expo-device', () => ({ isDevice: false }));
      jest.mock('expo-constants', () => ({ appOwnership: 'expo' }));

      const {
        isCompatibleWithDatadogNative,
      } = require('./isCompatibleWithDatadogNative');

      const value = isCompatibleWithDatadogNative();

      expect(value).toBe(false);
    });
  });
});
