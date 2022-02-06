async function handleRequest(request) {
    let response = await fetch("https://crementif.github.io/dumpling-launcher/payload.elf", {
        cf: {
            // Always cache this fetch regardless of content type
            // for a max of 5 seconds before revalidating the resource
            cacheTtl: 60 * 4,
            cacheEverything: true,
        },
    });
    // Reconstruct the Response object to make its headers mutable.
    response = new Response(response.body, response);

    // Set cache control headers to cache on browser for 25 minutes
    response.headers.set("Cache-Control", "max-age=20");
    response.headers.set("Content-Disposition", "attachment; filename=payload.elf");
    return response;
}

addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event.request))
})