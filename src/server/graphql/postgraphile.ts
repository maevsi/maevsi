import { postgraphile } from 'postgraphile'
import { PostGraphileAmberPreset } from 'postgraphile/presets/amber'
import { makeV4Preset } from 'postgraphile/presets/v4'
import { makePgService } from 'postgraphile/adaptors/pg'
import { grafserv, type H3Grafserv } from 'grafserv/h3/v1'
// import type { H3Event } from 'h3'

const preset = {
  extends: [
    PostGraphileAmberPreset,
    makeV4Preset({
      graphiql: true,
      graphiqlRoute: '/graphiql',
      graphqlRoute: '/graphql',
    }),
  ],
  pgServices: [
    makePgService({
      connectionString: 'postgres://postgres:postgres@postgres:5432/maevsi',
      schemas: ['maevsi'],
      pubsub: true,
    }),
  ],
  grafserv: {},
  grafast: {
    context: (_requestContext, args) => {
      // const event = _requestContext.h3v1?.event
      return {
        ...args.contextValue?.pgSettings,
        pgSettings: {
          'user.id': '5df32eea-74f9-4d53-88e9-90aa1752940d',
        },
      }
    },
  },
} satisfies GraphileConfig.Preset

const pgl = postgraphile(preset)

export const h3GrafServ = pgl.createServ(
  grafserv as any /** https://postgraphile.org/postgraphile/next/migrating-from-v4/#library-mode */,
) as unknown as H3Grafserv
