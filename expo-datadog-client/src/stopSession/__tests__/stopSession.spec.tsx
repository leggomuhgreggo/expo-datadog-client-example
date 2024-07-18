import { DdRum } from 'expo-datadog';

import { stopSession } from '../stopSession';

// ─── MOCKS ──────────────────────────────────────────────────────────────────────

jest.mock('expo-datadog', () => ({
  DdRum: {
    stopSession: jest.fn().mockImplementation(async () => {}),
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

      expect(DdRum.stopSession).toHaveBeenCalledTimes(1);
    });
  });
});
