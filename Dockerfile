#############
# Serve Nuxt in development mode.

# Should be the specific version of node:buster.
# `node-zopfli-es` and `sqitch` require at least buster.
# `node-zopfli-es` requires non-slim.
FROM node:16.7.0-buster@sha256:48724c60fe610e1295cc5f0aa8d9f2a87a4daf4a66d0089f910fcaf5c7e8d912 AS development

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
FROM node:16.7.0-buster@sha256:48724c60fe610e1295cc5f0aa8d9f2a87a4daf4a66d0089f910fcaf5c7e8d912 AS build

ARG HOST_IP=127.0.0.1
ENV HOST_IP ${HOST_IP}
ARG CI=false
ENV CI ${CI}
ARG NUXT_ENV_STACK_DOMAIN=maev.si
ENV NUXT_ENV_STACK_DOMAIN=${NUXT_ENV_STACK_DOMAIN}
ENV NODE_ENV=production

# Update and install dependencies.
# - `fonts-noto-color-emoji gconf-service`, ... is required by `puppeteer`
# - `jq` is required for storycap
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdbus-1-3 libdrm2 libgbm1 libgconf-2-4 libgtk-3-0 libnspr4 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxfixes3 libxi6 libxrandr2 libxss1 libxtst6 fonts-liberation libappindicator1 libnss3 libxshmfence1 lsb-release xdg-utils \
        jq \
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
FROM node:16.7.0-buster-slim@sha256:190329bf3e348a9eb7373576dab83737f54fbba56801025d6bae358e276875f3 AS production

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