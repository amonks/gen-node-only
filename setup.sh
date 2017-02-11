#! /usr/bin/env bash

echo "cleaning up"
rm -rf .git node_modules lib

read -p "Project Name? " project_name

echo "replacing files"
perl -p -i -e "s/NODE_ONLY_PROJECT_NAME/$project_name/g" `find .`

echo "installing deps"
yarn

echo "setting up git"
rm -rf .git
git init
git add .
git commit -am 'initial commit'
read -p "Github repo? " repo
git create $repo
git push -u origin master

echo "cleaning up self"
rm setup.sh

