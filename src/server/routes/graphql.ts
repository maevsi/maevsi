import { h3GrafServ } from '@/server/graphql/postgraphile'

export default defineEventHandler((event) =>
  h3GrafServ.handleGraphQLEvent(event),
)
