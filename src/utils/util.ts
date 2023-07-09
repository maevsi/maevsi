import { CombinedError } from '@urql/core'
import Clipboard from 'clipboard'
import { consola } from 'consola'
import { defu } from 'defu'
import { H3Event, getCookie } from 'h3'
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { Ref } from 'vue'
import { LocationQueryValue } from 'vue-router'

import { TIMEZONE_COOKIE_NAME, REGEX_UUID } from './constants'
import type {
  ArrayElement,
  BackendError,
  UnionToIntersection,
} from '~/types/types'

export const append = (path: string, pathToAppend: string) =>
  path + (path.endsWith('/') ? '' : '/') + pathToAppend

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const copyText = (text: string) =>
  new Promise((resolve, reject) => {
    const fakeElement = document.createElement('button')
    const clipboard = new Clipboard(fakeElement, {
      text: () => {
        return text
      },
      action: () => {
        return 'copy'
      },
      container: document.body,
    })
    clipboard.on('success', (e) => {
      clipboard.destroy()
      resolve(e)
    })
    clipboard.on('error', (e) => {
      clipboard.destroy()
      reject(e)
    })
    fakeElement.click()
  })

const getCsp = (host: string): Record<string, Array<string>> => {
  const hostName = host.replace(/:[0-9]+$/, '')
  const config = useRuntimeConfig()

  const stagingHostOrHost = config.public.stagingHost || host

  const base = {
    'base-uri': ["'none'"], // Mozilla Observatory.
    'connect-src': [
      "'self'",
      'blob:', // vue-advanced-cropper
      `https://${getDomainTldPort(stagingHostOrHost)}`, // `/api` requests
      `https://postgraphile.${getDomainTldPort(stagingHostOrHost)}`, // backend requests
      `https://tusd.${getDomainTldPort(stagingHostOrHost)}`, // image upload requests
      'https://*.analytics.google.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://*.google-analytics.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://*.googletagmanager.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://cdn.jsdelivr.net/npm/@sec-ant/', // vue-qrcode-reader
    ],
    'default-src': ["'none'"],
    'font-src': ["'self'", 'data:'], // @fontsource/manrope
    'form-action': ["'self'"], // Mozilla Observatory: "none".
    'frame-ancestors': ["'none'"], // Mozilla Observatory.
    'frame-src': ['https://challenges.cloudflare.com'], // Cloudflare Turnstile
    'img-src': [
      "'self'",
      'blob:',
      'data:',
      `https://tusd.${getDomainTldPort(stagingHostOrHost)}`,
      'https://*.google-analytics.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://*.googletagmanager.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      'https://www.gravatar.com/avatar/', // profile picture fallback
    ],
    'manifest-src': ["'self'"],
    'media-src': ["'none'"],
    'object-src': ["'none'"],
    'prefetch-src': ["'self'"],
    'report-uri': ['https://dargmuesli.report-uri.com/r/d/csp/enforce'],
    // TODO: evaluate header (https://github.com/maevsi/maevsi/issues/830) // https://stackoverflow.com/questions/62081028/this-document-requires-trustedscripturl-assignment
    // 'require-trusted-types-for': ["'script'"], // csp-evaluator
    'script-src': [
      'blob:',
      "'self'",
      'https://challenges.cloudflare.com', // Cloudflare Turnstile
      'https://static.cloudflareinsights.com', // Cloudflare analytics
      'https://*.googletagmanager.com', // Google Analytics 4 (https://developers.google.com/tag-platform/tag-manager/web/csp)
      "'unsafe-inline'", // https://github.com/unjs/nitro/issues/81
      "'unsafe-eval'", // https://github.com/unjs/nitro/issues/81
    ],
    'style-src': ["'self'", "'unsafe-inline'"], // Tailwind
  }

  const development = {
    'connect-src': [
      `http://${hostName}:24678/_nuxt/`,
      `https://${hostName}:24678/_nuxt/`,
      `ws://${hostName}:24678/_nuxt/`,
      `wss://${hostName}:24678/_nuxt/`,
    ],
  }

  const production = {
    'connect-src': [`https://${stagingHostOrHost}/cdn-cgi/rum`],
  }

  return defu(base, config.public.isInProduction ? production : development)
}

export const getCspAsString = (event: H3Event): string => {
  const host = getHost(event)
  const csp = getCsp(host)

  return Object.keys(csp).reduce((p, c) => `${p}${c} ${csp[c].join(' ')};`, '')
}

// export const getDeferredPromise = <T>(then?: (value: any) => T): Promise<T> => {
//   let res, rej

//   const promise: any = new Promise((resolve, reject) => {
//     res = resolve
//     rej = reject
//   })

//   promise.resolve = res
//   promise.reject = rej

//   if (then) {
//     const value = await promise
//     then(value)
//   }

//   return promise
// }

export const getDomainTldPort = (host: string) => {
  const hostParts = host.split('.')

  if (hostParts.length <= 2) return host

  return `${hostParts[hostParts.length - 2]}.${hostParts[hostParts.length - 1]}`
}

export const getHost = (event: H3Event) => {
  const host = event.node.req.headers.host

  if (!host) throw new Error('Host header is not given!')

  return host
}

export const getApiData = <
  S,
  T extends {
    data: Ref<S>
    error: Ref<CombinedError | undefined>
    fetching: Ref<boolean>
  }
>(
  queries?: T[]
) => {
  const apiData = computed(() => ({
    data: (queries || []).reduce(
      (p, c) => ({ ...p, ...c.data.value }),
      {} as NonNullable<
        UnionToIntersection<NonNullable<ArrayElement<T[]>['data']['value']>>
      >
    ),
    errors: (queries || []).reduce(
      (p, c) => (c.error.value ? [...p, c.error.value] : p),
      [] as BackendError[]
    ),
    isFetching: (queries || []).reduce((p, c) => p || c.fetching.value, false),
  }))

  watch(
    () => apiData.value.errors,
    (current, previous) => {
      current
        .filter((error) => !previous.includes(error))
        .forEach((error) => consola.error(error))
    }
  )

  return apiData
}

export const getCombinedErrorMessages = (
  errors: BackendError[],
  pgIds?: Record<string, string>
) => {
  const errorMessages: string[] = []

  for (const combinedError of errors) {
    if (combinedError.networkError) {
      errorMessages.push(combinedError.message)
    }

    for (const graphqlError of combinedError.graphQLErrors) {
      const translation = pgIds && pgIds[`postgres${graphqlError.errcode}`]

      if (translation) {
        errorMessages.push(translation)
      } else {
        errorMessages.push(graphqlError.message)
      }
    }
  }

  return errorMessages
}

export const getQueryString = (queryParametersObject: Record<string, any>) =>
  '?' +
  Object.keys(queryParametersObject)
    .map((key) => {
      return (
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(queryParametersObject[key] as string)
      )
    })
    .join('&')

export const getTimezone = async (event: H3Event) =>
  getCookie(event, TIMEZONE_COOKIE_NAME) ||
  (
    await $fetch<{ timezone: string }>(
      `http://ip-api.com/json/${event.node.req.headers['x-real-ip']}`
    )
  ).timezone

export const isNeitherNullNorUndefined = <T>(
  value: T | null | undefined
): value is T => value !== null && value !== undefined

export const isQueryIcFormatValid = (
  ic: LocationQueryValue | LocationQueryValue[]
) => ic && !Array.isArray(ic) && REGEX_UUID.test(ic)

export const showToast = ({
  confirmButtonText,
  icon = 'success',
  showCancelButton = false,
  showConfirmButton = false,
  timer = 3000,
  text,
  title,
}: {
  confirmButtonText?: string
  icon?: SweetAlertIcon
  showCancelButton?: boolean
  showConfirmButton?: boolean
  timer?: number
  text?: string
  title: string
}) =>
  Swal.fire({
    confirmButtonText,
    confirmButtonColor: '#1f2937',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    icon,
    position: 'bottom',
    showConfirmButton,
    showCancelButton,
    text,
    timer,
    timerProgressBar: true,
    title,
    toast: true,
  })
