### Hosting Methods/Journey

The various methods that were researched were definitely overkill in terms of work, but it was fun to learn how to get certain things to work on the Wii U which has some really annoying restrictions. So here's both some ways to do it for free and if you want to spend some money on a paid product.

#### Free
Initially this project was just going to be hosted on Github Pages to prevent any maintenance costs, which forces https and TLSv1.2+ if you don't set a custom domain.
This is a problem since the Wii U's built-in CURL library only supports websites with up to TLSv1.1, which was needed since the payloads wouldn't be able to include an updated CURL and OpenSSL library.

While it'd be possible to just host the website/payloads on some place that allows TLS 1.1 or allows http downloads (and doesn't use Let's Encrypt since the Wii U doesn't support that), I thought I'd use Cloudflare's Workers which would be able to cache and upgrade the TLS 1.1 CURL requests that can then go to the Github Pages or the Github Releases of the homebrew app you want, which allows for 100k requests which is more then enough, and it would all be completely free and easily updateable. These are the steps to run Dumpling easily.

1). Install and setup Wrangler from Cloudflare
2). Modify some of the names of the folders and the wrangler.toml files, probably.
3). Edit the index.js file of the `/dumpling/` folder to wherever you want it to download the latest github release of the homebrew from.
2). Use `wrangler publish` in both folders to deploy the functions to cloudflare and show the URLs.


#### Paid
Hosting it on Github Pages with a custom (sub)domain and then disabling https is probably the easiest method. You do need to manually build the static contents before committing changes and you lose https.

There's another way to host it, which is the one used for https://dumplingapp.com. Since it's under a custom domain it's possible to [change the minimum TLS version](https://tosbourn.com/setting-minimum-tls-version-cloudflare/) when using Cloudflare's Universal SSL. You might have to [change from a Let's Encrypt to a digicert certificate]() for the Wii U to support https on that domain. We can use Cloudflare Pages to also build the payload files, convert them into a static website and then host the website. You just give it a name and use `bash build-project.sh && bash build-site.sh` as the build command for it. And you'll also have to use your custom domain name and customize the urls in the config-cloudflare.h file.
