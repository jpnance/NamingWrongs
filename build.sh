#!/bin/bash

if [ -d build ]
then
	rm -rf build
fi

mkdir build

cp manifest.json build/
cp wrongs.js build/

zip build/wrongs.zip build/manifest.json build/wrongs.js
