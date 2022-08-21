#! /bin/sh

set -e -x

export NODE_ENV=production
export STARTER_NESTJS_CONFIG_FILE=/app/config/config.yaml

if [ X"${1}" = X"primary" ]; then
  if [ ! -f "/app/config/config.yaml" ]; then
    cp /app/config/config-example.yaml /app/config/config.yaml
  fi

  exec node /app/dist/main.js
else
  exec "$@"
fi
