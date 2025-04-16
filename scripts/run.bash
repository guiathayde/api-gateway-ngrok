#!/usr/bin/env bash

docker run -d -p 443:443 --name api-gateway --add-host host.docker.internal:host-gateway api-gateway
