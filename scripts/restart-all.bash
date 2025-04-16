#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR/.."
docker stop api-gateway
docker rm api-gateway
docker build -t api-gateway .
docker run -d -p 443:443 --name api-gateway --add-host host.docker.internal:host-gateway api-gateway
