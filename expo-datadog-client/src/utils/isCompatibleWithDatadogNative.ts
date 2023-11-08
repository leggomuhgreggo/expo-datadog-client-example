import Constants from 'expo-constants';

/**
 * Datadog native requires a config plugin to run.
 */
export const isCompatibleWithDatadogNative = (): boolean => {
  return !isExpoGo;
};

/**
 * The experience is running inside of the Expo Go app.
 * https://docs.expo.dev/versions/latest/sdk/constants/#appownership
 */
export const isExpoGo = Constants.appOwnership === 'expo';
