export const useSharedSentryConfig = () => {
  const isTesting = useIsTesting()
  const runtimeConfig = useRuntimeConfig()

  return getSharedSentryConfig({
    environment: runtimeConfig.public.vio.environment,
    host: runtimeConfig.public.sentry.host,
    isInProduction: runtimeConfig.public.vio.isInProduction,
    projectId: runtimeConfig.public.sentry.project.client.id,
    projectPublicKey: runtimeConfig.public.sentry.project.client.publicKey,
    release: runtimeConfig.public.vio.releaseName,
    isTesting,
  })
}
