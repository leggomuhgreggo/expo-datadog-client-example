import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

import { setUser } from '../setUser';

// ─── MOCKS ──────────────────────────────────────────────────────────────────────

jest.mock('@datadog/browser-logs', () => ({
  datadogLogs: {
    logger: { debug: jest.fn() },
  },
}));

jest.mock('@datadog/browser-rum', () => ({
  datadogRum: {
    setUser: jest.fn(),
    clearUser: jest.fn(),
  },
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
      setUser(TEST_USER.id);

      expect(datadogRum.setUser).toHaveBeenCalledTimes(1);
      expect(datadogRum.setUser).toHaveBeenCalledWith(TEST_USER);
    });
  });

  describe('when called WITHOUT an ID', () => {
    it('clears user', async () => {
      setUser();

      expect(datadogRum.clearUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('when setUser is called', () => {
    it('it logs', async () => {
      setUser();
      expect(datadogLogs.logger.debug).toHaveBeenCalledTimes(1);
    });
  });
});
