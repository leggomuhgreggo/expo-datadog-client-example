import { datadogRum as WebDatadogRum } from '@datadog/browser-rum';

export const stopSession = async () => {
  WebDatadogRum.stopSession();
};
