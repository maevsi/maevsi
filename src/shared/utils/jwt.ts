export const useJwtPublicKey = async () => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.vio.stagingHost) {
    return await $fetch<string>(
      `https://${runtimeConfig.public.vio.stagingHost}/api/auth-key`,
    )
  } else {
    return runtimeConfig.public.vio.auth.jwt.publicKey
  }
}
