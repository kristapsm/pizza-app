#!/bin/bash
set -e
. ./bootstrap/bootstrap.sh
chmod +x $GRADLE_HOME/bin/gradle
$GRADLE_HOME/bin/gradle $@