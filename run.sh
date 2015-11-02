#!/bin/bash

DIR=`pwd`

ps aux | grep busorder- | awk '{print $2}' | xargs kill -9
rm target/busorder-*-SNAPSHOT.jar -fv
pushd training-portal.git/branches/game/


svn update
mvn --quiet -DskipTests=true clean package

cp target/busorder-*-SNAPSHOT.jar ${DIR}

popd

nohup java -jar -Dport=80 busorder-*-SNAPSHOT.jar &

