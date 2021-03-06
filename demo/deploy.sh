#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist


git init
git checkout -b gh-pages
git add -A
git commit -m 'deploy'

git push -f git@github.com:harris-jacob/react-dice.git gh-pages:gh-pages

cd -