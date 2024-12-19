import type { RuntimeConfig } from 'nuxt/schema'

export const getTusdFilesUrl = ({
  runtimeConfig,
  host,
}: {
  runtimeConfig: RuntimeConfig
  host: string
}) =>
  `https://tusd.${getDomainTldPort(
    runtimeConfig.public.vio.stagingHost || host,
  )}/files/`
