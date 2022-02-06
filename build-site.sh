#!/bin/bash

rm -r -f docs
mkdir docs -p

#wget -q https://github.com/emiyl/dumpling/releases/latest/download/dumpling.zip
#unzip -p dumpling.zip wiiu/apps/dumpling/dumpling.rpx > ./docs/dumpling.rpx
#rm -r dumpling.zip

cd JsTypeHax
php index.php > ./../docs/index.html
php exploit.php > ./../docs/exploit.html
php 404.php > ./../docs/404.html
cp index.js ./../docs/index.js
cp payload.elf ./../docs/payload.elf
cd ..