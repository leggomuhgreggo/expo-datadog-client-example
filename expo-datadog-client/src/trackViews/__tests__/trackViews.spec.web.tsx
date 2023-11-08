import { createNavigationContainerRef } from '@react-navigation/native';
import { datadogLogs } from '@datadog/browser-logs';

import { trackViews } from '../trackViews';

// ─── MOCKS ──────────────────────────────────────────────────────────────────────

jest.mock('@datadog/browser-logs', () => ({
  datadogLogs: {
    logger: { warn: jest.fn().mockImplementation(async () => {}) },
  },
}));

// ─── TEST VALUES ────────────────────────────────────────────────────────────────

const navigationRef = createNavigationContainerRef();

// ────────────────────────────────────────────────────────────────────────────────

describe('trackViews', () => {
  it('warns when invoked on incorrect platform', () => {
    trackViews(navigationRef.current);

    expect(datadogLogs.logger.warn).toHaveBeenCalledTimes(1);
  });
});
