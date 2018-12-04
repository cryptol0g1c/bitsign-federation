FROM parity/parity:v2.1.8

WORKDIR /bitsign

RUN apt-get update && apt-get install -yq --no-install-recommends \
        gettext \
        nano \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY docker/parity-node/docker-entrypoint /usr/local/bin/
COPY docker/parity-node/config*.toml ./config/
COPY genesis.json ./
COPY nodes.txt ./

RUN chmod +x /usr/local/bin/docker-entrypoint

VOLUME ["/bitsign/base-path"]

ENTRYPOINT ["docker-entrypoint"]