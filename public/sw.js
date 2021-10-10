const CACHE_VERSION = 1;

let CURRENT_CACHE = {
    static : 'static-cache-v' + CACHE_VERSION,
    dynamic : 'dynamic-cache-v' + CACHE_VERSION
};



this.addEventListener('install' , (event) => {

    event.waitUntil(
        caches.open(CURRENT_CACHE['static'])
            .then((cache) => {
                cache.addAll([
                    '/',

                ]);
            })
    )



})



this.addEventListener('activate' , (event) => {
    console.log('activating service worker' , event);
    let expectedCacheNames = Object.values(CURRENT_CACHE);

    event.waitUntil(
        caches.keys().then(cacheNames => {
             console.log(cacheNames)
            return Promise.all(
                cacheNames.forEach(cacheName => {
                    if(! expectedCacheNames.includes(cacheName)) {
                        console.log('Deleting out of date cache:' , cacheName);

                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )

});





this.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {

        console.log("skip waiting")
        // console.log("update catches skipWaitingskipWaitingskipWaitingskipWaitingskipWaitingskipWaitingskipWaiting ")
        // localStorage.setItem("sw",CACHE_VERSION)
        // console.log(CACHE_VERSION)
        this.skipWaiting();
    }
});





this.addEventListener('fetch' , (event) => {

    return event.respondWith(
        fetch(event.request)
            .then(response => {
                return caches.open(CURRENT_CACHE['dynamic'])
                    .then(cache => {
                        cache.put(event.request, response.clone());
                        return response;
                    })
            })
            .catch(err => {
                return caches.match(event.request);
            })
    )







    //    return  event.respondWith(
    //     caches.match(event.request).then(response => {
    //         if(response) return response;
    //         return fetch(event.request).then(networkResponse => {
    //             caches.open(CURRENT_CACHE['dynamic'])
    //                 .then(cache => {
    //                     cache.put(event.request , networkResponse.clone());
    //                     return networkResponse;
    //                 })
    //         })
    //     })
    // )


});

// self.addEventListener('fetch' , (event) => {
//     // event.respondWith(
//     //     caches.match(event.request).then(response => {
//     //         if(response) return response;
//     //         return fetch(event.request).then(networkResponse => {
//     //             caches.open(CURRENT_CACHE['dynamic'])
//     //                 .then(cache => {
//     //                     cache.put(event.request , networkResponse.clone());
//     //                     return networkResponse;
//     //                 })
//     //         })
//     //     })
//     // )
//
//
//     // event.respondWith(
//     //   caches.match(event.request)
//     // )
//     let urls = [
//         'http://roocket.org/api/products'
//     ]
//
//     if(urls.indexOf(event.request.url) > -1) {
//         console.log('network first')
//         return event.respondWith(
//
//             fetch(event.request)
//                 .then(response => {
//                     return caches.open(CURRENT_CACHE['dynamic'])
//                         .then(cache => {
//                             cache.put(event.request , response.clone());
//                             return response;
//                         })
//                 })
//                 .catch(err => {
//                     return caches.match(event.request);
//                 })
//         )
//     } else {
//         console.log('cache first')
//
//         return event.respondWith(
//             caches.match(event.request).then(response => {
//                 if(response) return response;
//
//                 return fetch(event.request).then(networkResponse => {
//                     caches.open(CURRENT_CACHE['dynamic'])
//                         .then(cache => {
//                             cache.put(event.request , networkResponse.clone());
//                             return networkResponse;
//                         })
//                 })
//             })
//         )
//     }
// });