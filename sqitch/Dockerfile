FROM postgres:15.2

ENV POSTGRES_DB=maevsi
ENV POSTGRES_PASSWORD=postgres

WORKDIR /srv

RUN apt-get update \
  && apt-get install --no-install-recommends -y \
      libdbd-pg-perl postgresql-client sqitch

COPY ./ ./

RUN export SQITCH_TARGET="$(cat SQITCH_TARGET.env)" \
  && docker-entrypoint.sh postgres & \
  while ! pg_isready -h localhost -U postgres -p 5432; do sleep 1; done \
  && sqitch deploy -t db:pg://postgres:postgres@/maevsi \
  && pg_dump -s -h localhost -U postgres -p 5432 maevsi > schema.sql \
  && diff schema.sql schema.reference.sql
