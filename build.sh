#!/bin/bash

# install modules
npm i

# vendors
# this is an example on how to add a npm package as vendors for client side
# esbuild ./node_modules/query-string/index.js --bundle --format=iife --outfile=./public/vendors/querystring.js --global-name=querystring
esbuild ./node_modules/flag-icons/css/flag-icons.css --bundle --outdir=./public/vendors/flag-icons/ --loader:.svg=file

# add browser prefixes to stylesheets
npx postcss ./public/styles/*.css --use autoprefixer --replace --no-map