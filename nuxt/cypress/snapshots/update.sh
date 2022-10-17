#!/bin/bash

set -e

files=$(find cypress/snapshots/actual -regex ".*-actual.png")

for file in $files; do
  new="${file//\/actual\//\/base\/}"
  new="${new//-actual.png/-base.png}"
  mv "$file" "$new"
done
