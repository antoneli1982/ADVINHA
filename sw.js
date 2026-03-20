var CACHE='advinha-v2';
var URLS=[
  '/ADVINHA/',
  '/ADVINHA/index.html',
  'https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;600;700;800&display=swap'
];

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(URLS);}));
  self.skipWaiting();
});

self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }));
  self.clients.claim();
});

self.addEventListener('fetch',function(e){
  if(e.request.url.indexOf('firebase')!==-1||e.request.url.indexOf('gstatic')!==-1){
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(r){return r||fetch(e.request);})
  );
});
