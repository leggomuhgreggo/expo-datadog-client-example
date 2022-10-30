import { DdSdkReactNative } from 'expo-datadog';
import { setGlobalAttribute } from '../setGlobalAttribute';

// ─── MOCKS ───────────────────────────────────────────────────────────────────

jest.mock('expo-datadog', () => ({
  DdSdkReactNative: {
    setAttributes: jest.fn().mockImplementation(async () => {}),
  },
}));

// ─── TEST VALUES ─────────────────────────────────────────────────────────────

const KEY = 'dank';
const VALUE = 'wow';

// ─── TESTS ───────────────────────────────────────────────────────────────────

describe('setGlobalAttribute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  describe('when called with error message and context', () => {
    it('calls datadog with arguments', async () => {
      await setGlobalAttribute(KEY, VALUE);
      expect(DdSdkReactNative.setAttributes).toHaveBeenCalledTimes(1);
      expect(DdSdkReactNative.setAttributes).toHaveBeenCalledWith({
        [KEY]: VALUE,
      });
    });
    it('does not error', async () => {
      await expect(setGlobalAttribute(KEY, VALUE)).resolves.not.toThrow();
    });
  });
});
