import { DdRum } from 'expo-datadog';

export const stopSession = async () => {
  return DdRum.stopSession();
};
