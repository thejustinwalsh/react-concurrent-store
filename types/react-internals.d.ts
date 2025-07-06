import "react";

declare module "react" {
  export const __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: {
    A: {
      getCacheForType: <T>(resourceType: () => T) => T;
    };
    H: {
      useCacheRefresh: () => () => void;
    };
  };
}
