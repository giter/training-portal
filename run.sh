#!/bin/bash


ps aux | grep busorder- | awk '{print $2}' | xargs kill -9
rm target/busorder-*-SNAPSHOT.jar -fv

pushd training-portal.git/branches/game/


svn update
mvn package

cp target/busorder-*-SNAPSHOT.jar ~

popd

nohup java -jar -Dport=80 busorder-*-SNAPSHOT.jar &

