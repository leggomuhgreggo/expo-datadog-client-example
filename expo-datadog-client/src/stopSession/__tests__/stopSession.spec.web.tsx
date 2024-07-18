import { datadogRum } from '@datadog/browser-rum';

import { stopSession } from '../stopSession';

// ─── MOCKS ──────────────────────────────────────────────────────────────────────

jest.mock('@datadog/browser-rum', () => ({
  datadogRum: {
    stopSession: jest.fn(),
  },
}));

// ────────────────────────────────────────────────────────────────────────────────

describe('stopSession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when called', () => {
    it('stops user', async () => {
      await stopSession();

      expect(datadogRum.stopSession).toHaveBeenCalledTimes(1);
    });
  });
});
