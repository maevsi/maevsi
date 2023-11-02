export const useSentryConfig = () => {
  const isTesting = useIsTesting()
  const runtimeConfig = useRuntimeConfig()

  return getSentryConfig({
    environment: runtimeConfig.public.vio.environment,
    host: runtimeConfig.public.sentry.host,
    isInProduction: runtimeConfig.public.vio.isInProduction,
    projectId: runtimeConfig.public.sentry.project.client.id,
    projectPublicKey: runtimeConfig.public.sentry.project.client.publicKey,
    release: runtimeConfig.public.vio.releaseName,
    isTesting,
  })
}

export const getSentryConfig = ({
  environment,
  host,
  isInProduction,
  isTesting,
  projectId,
  projectPublicKey,
  release,
}: {
  environment: string
  host: string
  isInProduction: boolean
  isTesting?: boolean
  projectId: string
  projectPublicKey: string
  release: string
}) => ({
  dsn:
    projectPublicKey && host && projectId
      ? `https://${projectPublicKey}@${host}/${projectId}`
      : undefined,
  enabled: isInProduction && isTesting === false,
  environment,
  release,
  tracesSampleRate: 1.0,
})
