import JSZip from "./jszip.min.js";

async function handleRequest(request) {
    // Reconstruct the Response object to make its headers mutable.
    response = new Response(await MIRROR.get("rpx", { type: "arrayBuffer" }), {
        headers: {
            "content-type": "text/html; charset=utf-8",
            "Cache-Control": "max-age=20",
            "Content-Disposition": "attachment; filename=dumpling.rpx"
        }
    });
    return response;
}

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});


async function mirrorPayloads(event) {
    let response = await fetch("https://github.com/emiyl/dumpling/releases/latest/download/dumpling.zip", {
        cf: {
            // Always cache this fetch regardless of content type
            // for a max of 8 minutes before revalidating the resource
            cacheTtl: 60 * 8,
            cacheEverything: true,
        },
    });
    if (response.status != 200) {
        throw "When mirroring Github release, got "+response.status+" error, reason "+response.statusText;
    }

    let zip = await JSZip.loadAsync(await response.arrayBuffer());
    let responseBinary = await zip.file("wiiu/apps/dumpling/dumpling.rpx").async("uint8array");

    await MIRROR.put("rpx", responseBinary);
}

addEventListener("scheduled", event => {
    event.waitUntil(mirrorPayloads(event));
});