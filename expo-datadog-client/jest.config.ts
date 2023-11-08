import nxPreset from '../../jest.preset.expo';
import { coverageThreshold } from './jest.coverage';

// @FIXME: Review separation of concerns between root config and jest project configs
const BASE_CONFIG = {
  ...nxPreset,

  // Auto-updated by jest-coverage-thresholds-bumper in separate file
  coverageThreshold,

  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
};

export default {
  displayName: 'expo-datadog-client',
  coverageDirectory: nxPreset.coverageDirectory,
  coverageReporters: nxPreset.coverageReporters,

  projects: [
    { ...BASE_CONFIG, preset: 'jest-expo/ios' },
    { ...BASE_CONFIG, preset: 'jest-expo/android' },
    {
      ...BASE_CONFIG,
      preset: 'jest-expo/web',
      // will only run for files with .web
      testMatch: [
        `**/__tests__/**/*spec.web.[jt]s?(x)`,
        `**/__tests__/**/*test.web.[jt]s?(x)`,
        `**/?(*.)+(spec|test).web.[jt]s?(x)`,
      ],
    },
  ],
};
