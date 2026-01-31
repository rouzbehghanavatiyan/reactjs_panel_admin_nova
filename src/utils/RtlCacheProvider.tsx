import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// ایجاد کش با کلید اختصاصی 'muirtl'
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function RtlCacheProvider({ children }) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}