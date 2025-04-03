import { createClientConfig } from 'payload';
import { cache } from 'react';
let cachedClientConfig = global._payload_clientConfig;
if (!cachedClientConfig) {
  cachedClientConfig = global._payload_clientConfig = null;
}
export const getClientConfig = cache(args => {
  if (cachedClientConfig && !global._payload_doNotCacheClientConfig) {
    return cachedClientConfig;
  }
  const {
    config,
    i18n,
    importMap
  } = args;
  cachedClientConfig = createClientConfig({
    config,
    i18n,
    importMap
  });
  global._payload_clientConfig = cachedClientConfig;
  global._payload_doNotCacheClientConfig = false;
  return cachedClientConfig;
});
//# sourceMappingURL=getClientConfig.js.map