#!/bin/bash

git checkout deploy
git merge master

rm -rf ./build

cd client && yarn build

mv build ..

git add ../*

version="$(date)"

git cm "$version"

git push origin deploy

git checkout master
