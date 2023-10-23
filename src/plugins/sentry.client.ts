import * as Sentry from '@sentry/vue'

import { name, version } from '~/package.json'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const runtimeConfig = useRuntimeConfig()
  const dsn = `https://${runtimeConfig.public.sentry.project.client.publicKey}@${runtimeConfig.public.sentry.host}/${runtimeConfig.public.sentry.project.client.id}`

  if (!dsn) {
    return
  }

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn,
    environment: runtimeConfig.public.sentry.environment,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],
    release: `${name}@${version}`,
    replaysOnErrorSampleRate: 1.0, // lower as soon as there are too many events
    replaysSessionSampleRate: 1.0, // lower as soon as there are too many events
    tracePropagationTargets: ['localhost', 'https://your-server.com'], // control for which URLs distributed tracing should be enabled
    tracesSampleRate: 1.0, // enable performance monitoring
  })
})
