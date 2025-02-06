import * as Sentry from '@sentry/nuxt'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
// import dotenv from 'dotenv'

// import {
//   NUXT_PUBLIC_SENTRY_HOST,
//   NUXT_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE,
//   NUXT_PUBLIC_SENTRY_PROJECT_ID,
//   NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY,
//   NUXT_PUBLIC_VIO_ENVIRONMENT,
//   NUXT_PUBLIC_VIO_IS_TESTING,
// } from '~~/shared/utils/constants'
// import { RELEASE_NAME } from './node'

// dotenv.config()
// console.log('server', JSON.stringify(process.env))

// const sentryConfig = getSharedSentryConfig({
//   environment: process.env.NODE_ENV, // process.env.NUXT_PUBLIC_VIO_ENVIRONMENT || NUXT_PUBLIC_VIO_ENVIRONMENT,
//   host: 'o4507213726154752.ingest.de.sentry.io', // process.env.NUXT_PUBLIC_SENTRY_HOST || NUXT_PUBLIC_SENTRY_HOST,
//   isInProduction: process.env.NODE_ENV === 'production',
//   projectId: '4507213736837200', // process.env.NUXT_PUBLIC_SENTRY_PROJECT_ID || NUXT_PUBLIC_SENTRY_PROJECT_ID,
//   projectPublicKey: '5e253cec6a72a9eea44531e7205016ba', // process.env.NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY || NUXT_PUBLIC_SENTRY_PROJECT_PUBLIC_KEY,
//   // release: await RELEASE_NAME(), // TODO: enable once this file is moved to the `server` directory (https://github.com/getsentry/sentry-javascript/issues/14487)
//   isTesting: process.env.NUXT_PUBLIC_VIO_IS_TESTING === 'true', // || NUXT_PUBLIC_VIO_IS_TESTING,
// })

// if (sentryConfig.dsn) {
Sentry.init({
  dsn: 'https://5e253cec6a72a9eea44531e7205016ba@o4507213726154752.ingest.de.sentry.io/4507213736837200',
  enabled:
    process.env.NODE_ENV === 'production' &&
    (process.env.NUXT_PUBLIC_VIO_IS_TESTING === 'true') === false,
  environment: process.env.NODE_ENV,
  // release: await RELEASE_NAME(), // TODO: enable once this file is moved to the `server` directory (https://github.com/getsentry/sentry-javascript/issues/14487),
  // tracesSampleRate: 1.0, // TODO: reenable when "require" bug is resolved in build
  integrations: [nodeProfilingIntegration()],
  profilesSampleRate: 1.0, // (isNaN(Number(process.env.NUXT_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE)) ? undefined : Number(process.env.NUXT_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE)) || NUXT_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE, // profiling sample rate is relative to traces sample rate
})
// } else {
//   console.warn(
//     'Sentry configuration is incomplete, skipping Sentry initialization.',
//   )
// }
