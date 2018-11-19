#!/bin/bash
cd bar-beer-drinker-ui
git pull
#rm -r dist
ng build --prod --aot
aws s3 cp ./dist/bar-beer-drinker-ui s3://barbeerdrinkerplus --recursive --acl public-read
cd ../..
