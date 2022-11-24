import { IncomingMessage } from 'node:http'

import { CombinedError } from '@urql/core'
import Clipboard from 'clipboard'
import { ComputedRef, Ref } from 'vue'
import { LocationQueryValue } from 'vue-router'

import { REGEX_UUID } from './constants'

export type BackendError = CombinedError | { errcode: string; message: string }

export type ApiData = ComputedRef<{
  data?: Object
  errors: BackendError[]
  isFetching: boolean
}>

export function append(path: string, pathToAppend: string): string {
  return path + (path.endsWith('/') ? '' : '/') + pathToAppend
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function copyText(text: string) {
  return new Promise(function (resolve, reject) {
    const fakeElement = document.createElement('button')
    const clipboard = new Clipboard(fakeElement, {
      text: function () {
        return text
      },
      action: function () {
        return 'copy'
      },
      container: document.body,
    })
    clipboard.on('success', function (e) {
      clipboard.destroy()
      resolve(e)
    })
    clipboard.on('error', function (e) {
      clipboard.destroy()
      reject(e)
    })
    fakeElement.click()
  })
}

// export function getDeferredPromise<T>(then?: (value: any) => T): Promise<T> {
//   let res, rej

//   const promise: any = new Promise((resolve, reject) => {
//     res = resolve
//     rej = reject
//   })

//   promise.resolve = res
//   promise.reject = rej

//   if (then) {
//     promise.then((value: any) => {
//       then(value)
//     })
//   }

//   return promise
// }

export function getDomainTldPort(host: string) {
  const hostParts = host.split('.')

  return `${hostParts[hostParts.length - 2]}.${hostParts[hostParts.length - 1]}`
}

export function getHost(req: IncomingMessage) {
  if (!req.headers.host) throw new Error('Host header is not given!')

  return req.headers.host
}

export const getApiDataDefault = (): ApiData =>
  computed(() =>
    reactive({
      data: undefined,
      ...getApiMeta(),
    })
  )

export const getApiMeta = (
  queries?: {
    error: Ref<CombinedError | undefined>
    fetching: Ref<boolean>
  }[]
) => ({
  errors: queries
    ? queries.reduce((p, c) => {
        if (c.error.value) {
          return [...p, c.error.value]
        } else {
          return p
        }
      }, [] as BackendError[])
    : [],
  isFetching: queries
    ? queries.reduce((p, c) => p || c.fetching.value, false)
    : false,
})

export function getCombinedErrorMessages(
  errors: BackendError[],
  pgIds?: Record<string, string>
) {
  const errorMessages: string[] = []

  for (const error of errors) {
    if ('errcode' in error) {
      const translation = pgIds && pgIds[`postgres${error.errcode}`]

      if (translation) {
        errorMessages.push(translation)
      } else {
        errorMessages.push(error.message)
      }
    } else {
      const combinedError = error

      if (combinedError.networkError) {
        errorMessages.push(combinedError.message)
      }

      for (const graphqlError of combinedError.graphQLErrors) {
        errorMessages.push(graphqlError.message)
      }
    }
  }

  return errorMessages
}

export function getQueryString(
  queryParametersObject: Record<string, any>
): string {
  return (
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
  )
}

export const isQueryIcFormatValid = (
  ic: LocationQueryValue | LocationQueryValue[]
) => ic && !Array.isArray(ic) && REGEX_UUID.test(ic)

export function xhrPromise(
  method: string,
  url: string,
  jwt: string
): Promise<any> {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)

    if (jwt) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + jwt)
    }

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response)
      } else {
        reject(new Error(`${this.status}\n${xhr.statusText}`))
      }
    }
    xhr.onerror = function () {
      reject(new Error(`${this.status}\n${xhr.statusText}`))
    }
    xhr.send()
  })
}
