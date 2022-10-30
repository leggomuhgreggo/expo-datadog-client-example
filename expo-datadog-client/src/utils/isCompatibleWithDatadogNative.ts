import Constants from 'expo-constants';
import * as Device from 'expo-device';

/**
 * Datadog native requires a config plugin to run.
 */
export const isCompatibleWithDatadogNative = (): boolean => {
  return !isSimulator && !isExpoGo;
};

// ────────────────────────────────────────────────────────────────────────────────

/**
 * Device.isDevice returns true if on a real device and false if running simulator
 * NOTE: On web, Device.isDevice always returns true.
 * https://docs.expo.dev/versions/latest/sdk/device/#deviceisdevice
 */
export const isSimulator = !Device.isDevice;

/**
 * The experience is running inside of the Expo Go app.
 * https://docs.expo.dev/versions/latest/sdk/constants/#appownership
 */
export const isExpoGo = Constants.appOwnership === 'expo';
