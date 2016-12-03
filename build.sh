#!/bin/bash

if [ -d build ]
then
	rm -rf build
fi

mkdir build

cp manifest.json build/
cp wrongs.js build/

cd build

zip wrongs.zip manifest.json wrongs.js
