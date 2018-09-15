import {
  CACHE_PREFIX,
  CACHE_SUFFIX,
  ALL_CACHES,
  ALL_CACHES_LIST,
  CACHE_RULES,
  ALL_CACHE_RULES,
  ASSET_MANIFEST_URL
} from "./config";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setCacheNameDetails({
  prefix: CACHE_PREFIX,
  suffix: CACHE_SUFFIX,
  precache: ALL_CACHES.prefetch,
  runtime: ALL_CACHES.runtime,
});


/**
 * Get lastest assets-manifiest from server
 *
 * @public
 * @param {string} ASSET_MANIFEST_URL
 * @return {Promise}
 */
const  getAssetsManifiest = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((assetManifestJson) => {
        resolve(assetManifestJson);
      });
  })
}


const cleanResourcesFromCache = (resources) => {
  Object.entries(ALL_CACHES).forEach(async ([type, cacheName]) => {
    if (type === 'img') return;
    const cache = await caches.open(cacheName);
    const assets = await cache.keys();
    const removeAssets = assets.filter(asset => !resources[type].find(r => asset.url.match(r)))
    removeAssets.forEach(async r => await cache.delete(r));
  })
}

/**
 * Get key in asset manifest seperated as resource types
 *
 * @public
 * @param {[]} CACHE_RULES
 * @return {Object}
 */
const getResourceType = (assets) => {
  const resources = {
    js: [],
    css: [],
    img: [],
  };

  Object.keys(assets).map(asset => {
    ALL_CACHE_RULES.forEach(t => {
      if (assets[asset].match(t.test)) {
        resources[t.type].push(assets[asset]);
      }
    })
  })
  return resources;
}


/**
 * Delete all caches other than those whose names are
 * provided in a list
 *
 * @public
 * @param {string[]} cacheNamesToKeep names of caches to keep
 * @return {Promise}
 */
const removeUnusedCaches = (cacheNamesToKeep) => {
  return caches.keys().then((cacheNames) => {
    let toDelete = cacheNames.reduce((list, thisCache) => {
      if (cacheNamesToKeep.indexOf(thisCache) === -1)
        return list.concat(thisCache);
      return list;
    }, []);
    if (toDelete.length > 0) {
      console.log('SW: Deleting old caches', toDelete);
      return Promise.all(toDelete.map((c) => caches.delete(c)));
    } else {
      return Promise.resolve();
    }
  });
}




const registerRuntimeStrategies = () => {
  workbox.routing.registerRoute(
    CACHE_RULES.js.test,
    workbox.strategies.cacheFirst({
      cacheName: ALL_CACHES.js,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );


  workbox.routing.registerRoute(
    CACHE_RULES.css.test,
    workbox.strategies.cacheFirst({
      cacheName: ALL_CACHES.css,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    CACHE_RULES.img.test,
    workbox.strategies.cacheFirst({
      cacheName: ALL_CACHES.img,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        })
      ],
    })
  );
}




const main = async () => {
  registerRuntimeStrategies();
  const assetManifestJson = await getAssetsManifiest(ASSET_MANIFEST_URL);
  const resources = getResourceType(assetManifestJson);
  await removeUnusedCaches(ALL_CACHES_LIST);
  cleanResourcesFromCache(resources);
}


main();
