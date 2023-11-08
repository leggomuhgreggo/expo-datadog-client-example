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
