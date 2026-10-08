const CACHE='apogee-frontier-v2-3';
const BASE=new URL('./',self.location).href;
const FILES=['./','./index.html','./style.css','./engine.js','./app.js','./icon.svg','./manifest.webmanifest','./lab.html','./frontier.js','./survival.js','./space-renderer.js','./canvas-renderer.js','./frontier.css'].map(p=>new URL(p,BASE).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('apogee-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match(new URL('./index.html',BASE).href):Response.error()))));});
