#!/bin/bash

git checkout deploy

rm -rf ./build

cd client && yarn build

mv build ..

git add ../*

version="$(date)"

git cm "$version"
