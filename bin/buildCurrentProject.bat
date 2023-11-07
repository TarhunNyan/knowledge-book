@ECHO OFF

echo "Read env-var..."
for /f "delims== tokens=1,2" %%G in (env-var) do set %%G=%%H
echo FOLDER_FROM="%FOLDERFROM%"
echo FOLDER_TO="%FOLDERTO%"
echo Build...

cd ..
node ./ --folder-from='%FOLDERFROM%' --folder-to='%FOLDERTO%'

PAUSE