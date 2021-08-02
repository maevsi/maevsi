#############
# Serve Nuxt in development mode.

# Should be the specific version of node:buster.
# `node-zopfli-es` and `sqitch` require at least buster.
# `node-zopfli-es` requires non-slim.
FROM node:16.6.0-buster@sha256:9430fd769545661774788faeea0abcfe71a7f07f9da10b803552f8c7081edf7b AS development

# Update and install dependencies.
# - `git` is required by the `yarn` command
# - `sqitch` is required by the entrypoint
# - `curl` is required by the healthcheck
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        git \
    && apt-get install --no-install-recommends -y \
        libdbd-pg-perl \
        postgresql-client \
        sqitch \
    && apt-get install --no-install-recommends -y \
        curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY ./nuxt/package.json ./nuxt/yarn.lock ./

RUN yarn install

COPY ./nuxt/ ./

COPY ./sqitch/ /srv/sqitch/
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["dev", "--hostname", "0.0.0.0"]
HEALTHCHECK --interval=10s CMD curl -f http://localhost:3000/healthcheck || exit 1


########################
# Build Nuxt.

# Should be the specific version of node:buster.
# `node-zopfli-es` and `sqitch` require at least buster.
# `node-zopfli-es` requires non-slim.
FROM node:16.6.0-buster@sha256:9430fd769545661774788faeea0abcfe71a7f07f9da10b803552f8c7081edf7b AS build

ARG HOST_IP=127.0.0.1
ENV HOST_IP ${HOST_IP}
ARG CI=false
ENV CI ${CI}
ARG NUXT_ENV_STACK_DOMAIN=maev.si
ENV NUXT_ENV_STACK_DOMAIN=${NUXT_ENV_STACK_DOMAIN}
ENV NODE_ENV=production

# Update and install dependencies.
# - `git` is required by the `yarn` command
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY --from=development /srv/app/ ./

RUN yarn run lint \
    && yarn run build \
    && yarn run test

# Discard devDependencies.
RUN yarn install


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

# Should be the specific version of node:buster-slim.
# sqitch requires at least buster.
FROM node:16.6.0-buster-slim@sha256:547a8d333fbf85a5cc3b92b0133bc9774486887ee935cb0689ee100c665cc528 AS production

ENV NODE_ENV=production

# Update and install dependencies.
# - `sqitch` is required by the entrypoint
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        libdbd-pg-perl \
        postgresql-client \
        sqitch \
    && apt-get install --no-install-recommends -y \
        curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY --from=build /srv/app/ ./

COPY ./sqitch/ /srv/sqitch/
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["start", "--hostname", "0.0.0.0"]
HEALTHCHECK --interval=10s CMD curl -f http://localhost:3000/healthcheck || exit 1