# Install devkitpro and dependencies
wget -q https://github.com/devkitPro/pacman/releases/download/v1.0.2/devkitpro-pacman.amd64.deb
apt-get -y install gdebi-core
gdebi -n devkitpro-pacman.amd64.deb
dkp-pacman -Syu
dkp-pacman -S wiiu-dev --noconfirm
dkp-pacman -S ppc-portlibs --noconfirm

# Prepare environment
export DEVKITPRO=/opt/devkitpro
export DEVKITARM=/opt/devkitpro/devkitARM
export DEVKITPPC=/opt/devkitpro/devkitPPC
git pull --recurse-submodules --no-rebase
if [[ -z "${CF_PAGES}" ]]; then
else
    mv -f config-cloudflare.h config.h
fi

# Build WUT
git clone https://github.com/devkitPro/wut
cd wut
git reset --hard 31e97ecc65b813a14f77e4febbbdf9953372cddf
make
make install
cd ..

# Prepare JsTypeHax
cd JsTypeHax
wget -q https://github.com/wiiu-env/wiiuhaxx_common/releases/download/0.4/wiiuhaxx_common_v0.4.zip
unzip wiiuhaxx_common_v0.4.zip -d wiiuhaxx_common
rm -r wiiuhaxx_common_v0.4.zip
cd ..

# Build JsTypeHax_payload
cd JsTypeHax_payload
apt-get -y install xxd
make
cd ..

# Build CustomRPXLoader
cd CustomRPXLoader
make
cd ..