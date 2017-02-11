#! /usr/bin/env sh

# cd into __gen__ if we haven't already
if [ $(basename `pwd` != '__gen__') ]
then
  cd __gen__
  if [$(basename `pwd` != '__gen__') ]
  then
    exit 1
  fi
fi

yarn
node --harmony-async-await gen.js

