#!/bin/bash

echo "Read env-var..."
source ./env-var
echo "FOLDER_FROM=\"$FOLDERFROM\""
echo "FOLDER_TO=\"$FOLDERTO\""
echo "Build..."

cd ..
node ./ --folder-from="$FOLDERFROM" --folder-to="$FOLDERTO"

