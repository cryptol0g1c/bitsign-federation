FROM parity/parity:stable

VOLUME ["/data" ]

WORKDIR /root

ADD ./config.toml ./
ADD ./nodes.txt ./
ADD ./genesis.json ./
ADD ./docker-entrypoint /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint

# Install node
RUN apt-get update \
        && apt-get install -y curl git perl \
        && curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - \
        && apt-get install nodejs \
        && apt-get clean \
        && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
        && npm install -g pm2

# Install netstat client
RUN git clone https://github.com/cryptol0g1c/eth-net-intelligence-api.git \
        && cd eth-net-intelligence-api \
        && npm install

ENTRYPOINT ["docker-entrypoint"]
