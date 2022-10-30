import { datadogRum } from '@datadog/browser-rum';
import { logError } from '../logError';

// ─── MOCKS ──────────────────────────────────────────────────────────────────────
jest.mock('@datadog/browser-rum', () => ({
  datadogRum: { addError: jest.fn() },
}));

// ────────────────────────────────────────────────────────────────────────────────

const ERROR_MSG = 'App crash';
const ERROR_CONTEXT = { message: 'test error message' };

// ────────────────────────────────────────────────────────────────────────────────

describe('logError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when called with error message and context', () => {
    it('calls datadog with arguments', async () => {
      await logError(ERROR_MSG, ERROR_CONTEXT);
      expect(datadogRum.addError).toHaveBeenCalledTimes(1);
      expect(datadogRum.addError).toHaveBeenCalledWith(
        ERROR_MSG,
        ERROR_CONTEXT,
      );
    });
    it('does not error', async () => {
      await expect(logError(ERROR_MSG, ERROR_CONTEXT)).resolves.not.toThrow();
    });
  });
  describe('when called with JUST error message', () => {
    it('calls datadog with arguments', async () => {
      await logError(ERROR_MSG);
      expect(datadogRum.addError).toHaveBeenCalledTimes(1);
      expect(datadogRum.addError).toHaveBeenCalledWith(ERROR_MSG);
    });
    it('does not error', async () => {
      await expect(logError(ERROR_MSG)).resolves.not.toThrow();
    });
  });
});
