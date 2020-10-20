#############
# Serve Nuxt in development mode.

# Should be the specific version of node:buster-slim.
# sqitch requires at least buster.
FROM node:13.14.0-buster-slim@sha256:ffee53b7563851a457e5a6f485adbe28877cf92286cc7095806e09d721808669 AS development

# Update and install build dependencies
# - `git` is required by the `yarn` command
RUN apt-get update \
    && apt-get install --no-install-recommends -y git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY ./nuxt/ ./

RUN yarn

# Install sqitch.
RUN apt-get update \
    && apt-get install --no-install-recommends -y libdbd-pg-perl postgresql-client sqitch \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY ./sqitch/ /srv/sqitch/
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["dev", "--hostname", "0.0.0.0"]


########################
# Build Nuxt.

FROM node:14.13.1-slim@sha256:19d61ec884cc2c72aa72e2b59d2c02de5227b2a8e8fdd2174c693e8e6d9237d4 AS build

ARG NUXT_STACK_DOMAIN=maev.si
ENV NUXT_STACK_DOMAIN=${NUXT_STACK_DOMAIN}
ENV NODE_ENV=production

# Update and install build dependencies
# - `git` is required by the `yarn` command
RUN apt-get update \
    && apt-get install --no-install-recommends -y git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY --from=development /srv/app/ ./

RUN yarn run build

# Discard devDependencies.
RUN yarn install


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

# Should be the specific version of node:buster-slim.
# sqitch requires at least buster.
FROM node:14.13.1-buster-slim@sha256:2565c4d4f984f9219661ccd1618d61a0614a0385e2770b71c94bfd86a2388a50 AS production

# Install sqitch.
RUN apt-get update \
    && apt-get install --no-install-recommends -y libdbd-pg-perl postgresql-client sqitch \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY --from=build /srv/app/ ./

COPY ./sqitch/ /srv/sqitch/
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["start", "--hostname", "0.0.0.0"]