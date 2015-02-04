#!/bin/bash
set -e

CLASSPATH=
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WGET=wget
UNZIPP=unzip
CACHE=~/.bootstrap
mkdir -p $CACHE

for line in $(cat $DIR/bootstrap-lin.properties)
do
  arr=(${line//=/ })
  if [ ! -d "$CACHE/${arr[1]}" ]; then
    $WGET --tries=3 --no-check-certificate --output-document=$CACHE/${arr[1]}.zip ${arr[2]}
    mkdir $CACHE/${arr[1]}
  	echo Extracting $CACHE/${arr[1]}.zip ...
  	$UNZIPP -q $CACHE/${arr[1]}.zip -d $CACHE/${arr[1]}
  fi
  export ${arr[0]}=$CACHE/${arr[1]}
  echo ${arr[0]}=$CACHE/${arr[1]}
  export PATH=$CACHE/${arr[1]}/bin:$PATH
done
