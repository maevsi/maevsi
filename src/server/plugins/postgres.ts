import { sql } from '../utils/dependencies/postgres'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hookOnce('close', async () => {
    sql.end({ timeout: 5 })
  })
})
