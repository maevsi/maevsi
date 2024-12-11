export const useGetServiceHref = () => {
  const host = useHost()
  const runtimeConfig = useRuntimeConfig()

  return ({
    isSsr = true,
    name,
    port,
  }: {
    isSsr?: boolean
    name?: string
    port?: number
  }) =>
    getServiceHref({
      host,
      isSsr,
      name,
      port,
      stagingHost: runtimeConfig.public.vio.stagingHost,
    })
}
