import { datadogRum } from '@datadog/browser-rum';

import { setGlobalAttribute } from '../setGlobalAttribute';

// ─── MOCKS ───────────────────────────────────────────────────────────────────

jest.mock('@datadog/browser-rum', () => ({
  datadogRum: { setGlobalContextProperty: jest.fn() },
}));

// ─── TEST VALUES ─────────────────────────────────────────────────────────────

const KEY = 'dank';
const VALUE = 'wow';

// ─── TESTS ───────────────────────────────────────────────────────────────────

describe('setGlobalAttribute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when called scopeKey and value', () => {
    it('calls setGlobalContextProperty with arguments', async () => {
      await setGlobalAttribute(KEY, VALUE);
      expect(datadogRum.setGlobalContextProperty).toHaveBeenCalledTimes(1);
      expect(datadogRum.setGlobalContextProperty).toHaveBeenCalledWith(
        KEY,
        VALUE,
      );
    });
    it('does not error', async () => {
      await expect(setGlobalAttribute(KEY, VALUE)).resolves.not.toThrow();
    });
  });
});
