import pg from 'pg'

// https://github.com/brianc/node-postgres/issues/2137
// https://github.com/brianc/node-postgres/issues/2353

export const postgres = new pg.Pool({
  database: process.env.PGDATABASE,
  host: 'postgres',
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
})
