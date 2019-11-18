############
# Serve Vue.

# Should be the specific version of node:current-slim.
FROM node:12.13.0-stretch-slim@sha256:b6791b911fb5d0be22c9b12d608d9f70e089b9ffb5f83e1e01012df3be0f75f6 AS development

# Install gridsome.
RUN yarn global add @gridsome/cli

WORKDIR /srv/app/

COPY ./gridsome/ /srv/app/

RUN yarn


########################
# Build and compile Vue.

# Should be the specific version of node:current-slim.
FROM node:12.13.0-stretch-slim@sha256:b6791b911fb5d0be22c9b12d608d9f70e089b9ffb5f83e1e01012df3be0f75f6 AS build

WORKDIR /srv/app/

COPY --from=development /srv/app/ /srv/app/

RUN yarn build


#######################
# Provide a web server.
# Only the compiled app, ready for production with Nginx.

# Should be the specific version of nginx:stable.
FROM nginx:1.16.1-alpine AS production

COPY --from=build /srv/app/dist/ /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
