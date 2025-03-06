// import { useRuntimeConfig } from '#imports'
import * as Sentry from '@sentry/nuxt'
import { consola } from 'consola'

const runtimeConfig = useRuntimeConfig()
const sharedSentryConfig = useSharedSentryConfig()

if (sharedSentryConfig.dsn) {
  Sentry.init({
    ...sharedSentryConfig,
    integrations: [
      Sentry.browserProfilingIntegration(),
      Sentry.captureConsoleIntegration({ levels: ['error'] }),
      Sentry.httpClientIntegration(),
      Sentry.replayIntegration(),

      // // enable once plain JWT isn't stored any more
      // Sentry.piniaIntegration(usePinia()),

      // // enable if more components or hooks should be tracked
      // Sentry.vueIntegration({
      //   tracingOptions: {
      //     trackComponents: true,
      //     hooks: ['activate', 'create', 'unmount', 'mount', 'update'],
      //   },
      // }),
    ],
    replaysOnErrorSampleRate:
      runtimeConfig.public.sentry.replays.onError.sampleRate,
    replaysSessionSampleRate:
      runtimeConfig.public.sentry.replays.session.sampleRate,
    tracePropagationTargets: [
      /^https:\/\/postgraphile\.(localhost|maev\.si)\/graphql/,
      /^https:\/\/(localhost|maev\.si)\/api/,
    ],

    // // TODO: enable when offline support is implemented
    // transport: Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport),
  })
} else {
  consola.warn(
    'Sentry configuration is incomplete, skipping Sentry initialization.',
  )
}
