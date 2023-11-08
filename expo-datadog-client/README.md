# expo-datadog-client

This library provides cross-platform abstractions around a few different datadog client features, primarily centered around [Real User Monitoring (RUM)](https://docs.datadoghq.com/real_user_monitoring/)

### Background

Datadog does not have a cross-platform RUM library. Instead, there are individual libraries for web and RN:

- [`@datadog/browser-rum`](https://docs.datadoghq.com/real_user_monitoring/browser/)
- [`expo-datadog`](https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/)

In addition, there're a couple of "companion libraries" that power some advanced features

- [` @datadog/browser-logs`](https://docs.datadoghq.com/logs/log_collection/javascript/)
- [`@datadog/mobile-react-native`](https://github.com/DataDog/dd-sdk-reactnative/tree/develop/packages/react-navigation)

### Problem

Maintaining optimal configurations and separate usages for each ~platform can be quite a challenge -- especially across multiple RN projects in the monorepo.

### Solution

Create abstractions to unify configuration and keep up with features enhancements in a single place.

## Features

|                      | React Native | Browser | Notes                                      |
| -------------------- | ------------ | ------- | ------------------------------------------ |
| `initDatadog`        | ✅           | ✅      | Starts datadog client                      |
| `setUser`            | ✅           | ✅      | Updates Datadog session with user          |
| `logError`           | ✅           | ✅      | Sends datadog specific errors              |
| `setGlobalAttribute` | ✅           | ✅      | Add custom entry to RUM session context    |
| `trackViews`         | ✅           | shim    | `@datadog/browser-rum` has default support |

## Implementation Notes

Initially I tried to create a single abstraction for RUM client config, but I realized that the properties changed too much and weren't safe to assume as equivalent.

So now I have a subset of core properties that are shared: env service applicationId clientToken version

And for everything else I have platform-specific config objects, so my abstraction looks approximately like this:

```tsx
export const initDatadog = async () => {
  await customDatadog.init(
    {
      applicationId: process.env.DD_RUM_APPLICATION_ID,
      clientToken: process.env.DD_RUM_CLIENT_TOKEN,
      env: process.env.DD_RUM_ENVIRONMENT,
      serviceName: process.env.DD_SERVICE_NAME, // RN alias of `service`
      version: process.env.APP_VERSION_DATADOG,
    },
    {
      rumNative: {
        firstPartyHosts: TRACING_ORIGINS,
        sessionSamplingRate: 90,
        resourceTracingSamplingRate: 90,
        telemetrySampleRate: 90,
      },
      rumWeb: {
        allowedTracingUrls: TRACING_ORIGINS,
        sampleRate: 90,
        sessionReplaySampleRate: 90,
        telemetrySampleRate: 90,
      },
    }
  );
};
```
