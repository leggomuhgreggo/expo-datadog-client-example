# expo-datadog-client

This library provides cross-platform abstractions around a few different datadog client features, primarily centered around [Real User Monitoring (RUM)](https://docs.datadoghq.com/real_user_monitoring/)

### Background

There's not currently a cross-platform RUM library. Instead, there are individual Datadog libraries for web and RN:

- [`@datadog/browser-rum`](https://docs.datadoghq.com/real_user_monitoring/browser/)
- [`@datadog/mobile-react-native`](https://docs.datadoghq.com/real_user_monitoring/reactnative/)

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

### Config & X-Platform TypeDefs

Because the two RUM client libraries have been developed independently, the configurations are "similar but different"

In order to get them to work through a shared interface, the config is "overloaded", with the options for both. Since the config is explicitly mapped to the internal init functions there's no risk of an overloaded value accidentally impacting the wrong platform.

To do this safely, the properties are deconstructed into categories, the point of which is to: (a) normalize shared config; and (b) ensure that any config differences are _exclusive_ to the platform.

NOTE: The current TS approach is overly complicated and can be simplified significantly

The categories are:

- shared - props that are 1-to-1
- aliased - props that are functionally the same but named slightly differently
- native only - props that are only for `expo-datadog`
- web only - props that are only for `@datadog/browser-rum` (and `@datadog/browser-logs`)

Note: the TypeDefs are written a bit procedurally -- there's probably ways to make this a bit dynamic

## Future Considerations

There are definitely areas for improvement. Hopefully Datadog is inspired at some point to create a consolidated package.

- Restore expo-datadog config plugin, and review ExpoGo conditioning (fallback to browser SDK?) + source maps
- Custom Logger / Error, integrated with [`react-native-logs`](https://www.npmjs.com/package/react-native-logs)
- Standardize "view names" between Native and Browser tracking scripts
- Create "option aliasing" fn and improve typescript
- Add conditional setter for native init method
- Review debug logging
- Improve testing around device conditions for native methods
- Maybe publish?

### Running unit tests

Run `nx test expo-datadog-client` to execute the unit tests via [Jest](https://jestjs.io).
