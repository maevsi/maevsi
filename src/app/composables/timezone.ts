export const useTimezone = () =>
  useNuxtApp().ssrContext?.event.context.$timezone ||
  useCookie(TIMEZONE_COOKIE_NAME, {
    httpOnly: false,
    sameSite: 'strict',
    secure: useRuntimeConfig().public.vio.isInProduction,
  }).value ||
  (import.meta.client
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : undefined)
