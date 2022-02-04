#!/bin/bash
mkdir dist -p

wget -q https://github.com/emiyl/dumpling/releases/latest/download/dumpling.zip
unzip -p dumpling.zip wiiu/apps/dumpling/dumpling.rpx > ./dist/dumpling.rpx
rm -r dumpling.zip

cd JsTypeHax
php index.php > ./../dist/index.html
php exploit.php > ./../dist/exploit.html
cp index.js ./../dist/index.js
cp payload.elf ./../dist/payload.elf
cd ..