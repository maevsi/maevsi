import * as Sentry from '@sentry/vue'
import { consola } from 'consola'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const sentryConfig = useSentryConfig()

  if (!sentryConfig.dsn) {
    consola.warn(
      'Sentry configuration is incomplete, skipping Sentry initialization.',
    )
    return
  }

  Sentry.init({
    ...sentryConfig,
    app: nuxtApp.vueApp,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],
    replaysOnErrorSampleRate: 1.0, // lower as soon as there are too many events
    replaysSessionSampleRate: 1.0, // lower as soon as there are too many events
    tracePropagationTargets: [
      'localhost',
      'https://maev.si',
      'https://maevsi.com',
    ], // control for which URLs distributed tracing should be enabled
  })
})
