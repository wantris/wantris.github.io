importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox){
  console.log(`Yeaaa workbox has register :D`);
}else{
  console.log(`hmm Sorry workbox failed to register :( )`);
}

workbox.precaching.precacheAndRoute([
  {url:'/', revision:'1'},
  {url:'/index.html', revision:'1'},
  {url:'/detailTeam.html', revision:'1'},
  {url:'/manifest.json', revision:'1'},
  {url:'/css/materialize.min.css', revision:'1'},
  {url:'/css/spacing.css', revision:'1'},
  {url:'/css/style.css', revision:'1'},
  {url:'/pages/home.html', revision:'1'},
  {url:'/pages/nav.html', revision:'1'},
  {url:'/pages/klasemen.html', revision:'1'},
  {url:'/pages/favorite.html', revision:'1'},
  {url:'/js/api.js', revision:'1'},
  {url:'/js/dbfootball.js',revision:'1'},
  {url:'/js/idb.js',revision:'1'},
  {url:'/js/materialize.min.js',revision:'1'},
  {url:'/js/nav.js',revision:'1'},
  {url:'/js/sw.js',revision:'1'},
  {url:'/service-worker.js', revision:'1'},
  {url:'/icon192.png', revision:'1'},
  {url:'/icon512.png', revision:'1'},
  {url:'/assets/banner2.jpg', revision:'1'},
  {url:'/assets/football.png',revision:'1'},
  {url:'/assets/premiere.png', revision:'1'},
  {url:'/assets/icon/browser.svg', revision:'1'},
  {url:'/assets/icon/email.svg', revision:'1'},
  {url:'/assets/icon/stadium.svg', revision:'1'},
])
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/detailTeam.html'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/css/style.css'),
  workbox.strategies.cacheFirst()
);



workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'imagesCache',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
      ],
  }),
);

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message a message';
  }
  var options = {
    body: body,
    icon: 'icon192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});