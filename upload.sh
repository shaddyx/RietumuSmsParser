#!/bin/sh
now=$(date +"%m_%d_%Y_%H_%m_%s")
ssh shaddy@shaddy.org.ua -t "rm -rf tmp/rietumu/;mkdir -p tmp/rietumu/"
scp platforms/android/build/outputs/apk/android-debug.apk shaddy@shaddy.org.ua:tmp/rietumu/$now.apk