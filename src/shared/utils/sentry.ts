export const getSharedSentryConfig = ({
  environment,
  host,
  isInProduction,
  isTesting,
  projectId,
  projectPublicKey,
  release,
}: {
  environment?: string
  host: string
  isInProduction: boolean
  isTesting?: boolean
  projectId: string
  projectPublicKey: string
  release?: string
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
