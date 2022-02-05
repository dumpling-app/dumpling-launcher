import JSZip from "./jszip.min.js";

async function handleRequest(request) {
    let response = await fetch("https://github.com/emiyl/dumpling/releases/latest/download/dumpling.zip", {
        cf: {
            // Always cache this fetch regardless of content type
            // for a max of 5 seconds before revalidating the resource
            cacheTtl: 60 * 4,
            cacheEverything: true,
        },
    });

    let zip = await JSZip.loadAsync(await response.arrayBuffer());
    let responseBinary = await zip.file("wiiu/apps/dumpling/dumpling.rpx").async("uint8array");

    // Reconstruct the Response object to make its headers mutable.
    response = new Response(responseBinary, response);

    // Set cache control headers to cache on browser for 25 minutes
    response.headers.set("Cache-Control", "max-age=20");
    response.headers.set("Content-Disposition", "attachment; filename=dumpling.rpx");
    return response;
}

addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event.request))
})