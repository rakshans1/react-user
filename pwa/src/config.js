export const CACHE_VERSION = 1;
export const CACHE_PREFIX = 'RU';
export const CACHE_SUFFIX = `v${CACHE_VERSION}`;

export const getCacheName = (name) => {
  return `${CACHE_PREFIX}-${name}-${CACHE_SUFFIX}`;
}

export const ALL_CACHES = {
  prefetch: getCacheName('PREFETCH'),
  runtime: getCacheName('RUNTIME'),
  js: getCacheName('JAVASCRIPT'),
  css: getCacheName('CSS'),
  img: getCacheName('IMAGE')
};
export const ALL_CACHES_LIST = Object.keys(ALL_CACHES).map(k => ALL_CACHES[k]);

export const CACHE_RULES = {
  css: {
    test: /static\/.*\.css$/,
    type: "css"
  },
  js: {
    test: /static\/.*\.js$/,
    type: "js"
  },
  img: {
    test: /.*\.(?:png|jpg|jpeg|svg|gif)$/,
    type: "image"
  }
};

export const ALL_CACHE_RULES = Object.keys(CACHE_RULES).map(k => CACHE_RULES[k]);

export const ASSET_MANIFEST_URL = `${self.location.protocol}//${self.location.host}/asset-manifest.json`;

