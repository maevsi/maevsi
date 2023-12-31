import { postgraphile } from 'postgraphile'

export default fromNodeMiddleware(
  postgraphile('postgres://postgres:postgres@postgres:5432/maevsi', 'maevsi', {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  }),
)
