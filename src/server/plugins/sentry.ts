import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import { consola } from 'consola'

export default defineNitroPlugin((nitroApp) => {
  const runtimeConfig = useRuntimeConfig()
  const dsn = `https://${runtimeConfig.public.sentry.project.nitro.publicKey}@${runtimeConfig.public.sentry.host}/${runtimeConfig.public.sentry.project.nitro.id}`

  if (!dsn) {
    consola.warn('Sentry DSN not set, skipping Sentry initialization')
    return
  }

  Sentry.init({
    dsn,
    environment: runtimeConfig.public.sentry.environment,
    integrations: [new ProfilingIntegration()],
    profilesSampleRate: 1.0, // profiling sample rate is relative to traces sample rate
    release: runtimeConfig.public.vio.releaseName,
    tracesSampleRate: 1.0, // enable performance monitoring
  })

  nitroApp.hooks.hook('error', (error) => {
    // if (error instanceof H3Error) {
    //   if (error.statusCode === 404) {
    //     return
    //   }
    // }

    Sentry.captureException(error)
  })

  nitroApp.hooks.hook('request', (event) => {
    event.context.$sentry = Sentry
  })

  nitroApp.hooks.hookOnce('close', async () => {
    await Sentry.close(2000)
  })
})
