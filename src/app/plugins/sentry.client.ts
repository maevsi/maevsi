import * as Sentry from '@sentry/vue'
import { consola } from 'consola'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter()
  const sharedSentryConfig = useSharedSentryConfig()

  if (!sharedSentryConfig.dsn) {
    consola.warn(
      'Sentry configuration is incomplete, skipping Sentry initialization.',
    )
    return
  }

  Sentry.init({
    ...sharedSentryConfig,
    app: nuxtApp.vueApp,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.captureConsoleIntegration({ levels: ['error'] }),
      Sentry.httpClientIntegration(),
      Sentry.replayIntegration(),
    ],
    replaysOnErrorSampleRate:
      runtimeConfig.public.sentry.replays.onError.sampleRate,
    replaysSessionSampleRate:
      runtimeConfig.public.sentry.replays.session.sampleRate,
    tracePropagationTargets: [
      'localhost',
      'https://maev.si',
      'https://maevsi.com',
    ],
  })
})
