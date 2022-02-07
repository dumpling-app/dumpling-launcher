## Dumpling Web Launcher

### Description
Dumpling Web Launcher is used to launch [Dumpling](https://github.com/emiyl/dumpling), a Wii U homebrew application used for dumping Wii U games and files, without requiring an SD card or setting up any files.  

Doesn't aim to replace the need for homebrewing your Wii U (which is very easy and safe) and Dumpling is still available through the normal methods.


### How To Use

You can use it on your Wii U by navigating to [dumplingapp.com](https://dumplingapp.com/).

### Sources

This is a basically a guide to host this website, which uses various projects:
 - https://github.com/wiiu-env/JsTypeHax
 - https://github.com/wiiu-env/JsTypeHax_payload
    - https://github.com/wiiu-env/payload_loader
    - https://github.com/wiiu-env/gx2sploit
 - https://github.com/wiiu-env/wiiuhaxx_common
 - https://github.com/wiiu-env/CustomRPXLoader

All of the modifications were done in these repositories:
 - https://github.com/Crementif/JsTypeHax
 - https://github.com/Crementif/JsTypeHax_payload
 - https://github.com/Crementif/payload_loader/tree/curl_payload
 - https://github.com/Crementif/CustomRPXLoader

- Also uses [jszip](https://github.com/Stuk/jszip) for the dynamic Dumpling updating, licensed under MIT.


### Roadmap
 - Make URLs not hardcoded into the binaries but dynamically passed by the binary.
 - Maybe consolidate these forks into a single repository.

### Building

1. Install [devkitpro](https://devkitpro.org/wiki/Getting_Started) and install the wiiu-dev group packages.
2. Install [wut](https://github.com/devkitPro/wut/#building-from-source) from source.
3. Install ppc-portlibs in devkitpro's pacman using `(dkp-)pacman -Syu ppc-portlibs`.
4. Clone this repository with all the submodules using `git clone --recurse-submodules https://github.com/Crementif/dumpling-launcher`.
5. Place the contents from the latest .zip at https://github.com/wiiu-env/wiiuhaxx_common/releases in the wiiuhaxx_common folder that's inside JsTypeHax.
6. Customize the config.h file with URLs that'll be used to download the RPX and CustomRPXLauncher payload from, since it's currently all hardcoded at build time.
7. Run `make` to build the code550.bin and payload.elf.
8. Host the JsTypeHax folder on a PHP-enabled server and you'll be able to launch your given app.

### Hosting

Check [/Hosting/INSTRUCTIONS.md](/Hosting/INSTRUCTIONS.md) for more info about how to host this.
