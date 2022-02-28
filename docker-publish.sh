#!/bin/bash -eu

REGISTRY=docker-registry.pdmz.lasp.colorado.edu/web # Default registry
NAME=swqu
# have to check to make sure REFSPEC is bound / not empty for script to run
if [[ ! -z ${REFSPEC+x} ]] && [ "${REFSPEC}" = "dev" ] ; then
VERSION=dev
else
VERSION="${VERSION:-$(npm version | head -n 1 | awk '{print $3;}' | tr -d "',")}"
fi

docker push ${REGISTRY}/${NAME}:${VERSION}
docker rmi ${REGISTRY}/${NAME}:${VERSION}
