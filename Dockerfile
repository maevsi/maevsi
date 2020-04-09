############
# Serve Vue.

# Should be the specific version of node:buster-slim.
FROM node:13.12.0-buster-slim@sha256:cc0d8c39734f51153a52a35bcec871b0829b7cfe256fb39583b3dfc54a323314 AS development

# Update and install build dependencies
RUN \
    apt-get update && \
    apt-get install -y git

# Install gridsome.
RUN yarn global add @gridsome/cli

WORKDIR /srv/app/

COPY ./gridsome/ /srv/app/

RUN yarn

# Install sqitch.
RUN apt-get update && apt-get -y install libdbd-pg-perl postgresql-client sqitch

COPY ./sqitch/ /srv/sqitch/
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["develop"]


########################
# Build and compile Vue.

# Should be the specific version of node:current-slim.
FROM node:13.12.0-stretch-slim@sha256:fdc6dc81ea417ac56e3ed5d20d240f47d281674b0110dd2c0c6e3d511b4160ad AS build

ARG GRIDSOME_STACK_DOMAIN=maev.si
ENV GRIDSOME_STACK_DOMAIN=${GRIDSOME_STACK_DOMAIN}
ENV NODE_ENV=production

WORKDIR /srv/app/

COPY --from=development /srv/app/ /srv/app/

RUN yarn build


#######################
# Provide a web server.
# Only the compiled app, ready for production with Nginx.

# Should be the specific version of nginx:stable.
FROM nginx:1.17.6@sha256:36b77d8bb27ffca25c7f6f53cadd059aca2747d46fb6ef34064e31727325784e AS production

# Install sqitch.
RUN apt-get update && apt-get -y install libdbd-pg-perl postgresql-client sqitch

COPY --from=build /srv/app/dist/ /usr/share/nginx/html/

COPY ./sqitch/ /srv/sqitch/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]