import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

import { init } from '../init';

// ─── MOCKS ──────────────────────────────────────────────────────────────────────

jest.mock('@datadog/browser-logs', () => ({
  datadogLogs: {
    init: jest.fn(),
    logger: { debug: jest.fn() },
  },
}));

jest.mock('@datadog/browser-rum', () => ({
  datadogRum: {
    init: jest.fn(),
    startSessionReplayRecording: jest.fn(),
  },
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

  describe('when called config', () => {
    it('registers user', async () => {
      await init(CONFIG);

      expect(datadogRum.init).toHaveBeenCalledTimes(1);
      expect(datadogRum.startSessionReplayRecording).toHaveBeenCalledTimes(1);
      expect(datadogLogs.init).toHaveBeenCalledTimes(1);
    });
  });
});
