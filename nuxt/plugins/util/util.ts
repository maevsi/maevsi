import { IncomingMessage } from 'node:http'

import { CombinedError } from '@urql/core'
import Clipboard from 'clipboard'
import { computed, Ref } from 'vue'

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

export function getHost(req: IncomingMessage) {
  if (!req.headers.host) throw new Error('Host header is not given!')

  return req.headers.host
}

export function getApiDataDefault() {
  return {
    api: computed(() => {
      return {
        data: {},
        ...getApiMeta([]),
      }
    }),
  }
}

export function getApiMeta(
  queries: {
    error: Ref<CombinedError | undefined>
    fetching: Ref<boolean>
  }[]
) {
  return {
    errors: queries.reduce((p, c) => {
      if (c.error.value) {
        return [...p, c.error.value]
      } else {
        return p
      }
    }, [] as (CombinedError | { errcode: string; message: string })[]),
    isFetching: queries.reduce((p, c) => p || c.fetching.value, false),
  }
}

export function getCombinedErrorMessages(
  t: any,
  errors: (CombinedError | { errcode: string; message: string })[]
) {
  const errorMessages: string[] = []

  for (const error of errors) {
    if ('errcode' in error) {
      const translationId = 'postgres' + error.errcode
      const translation = t(translationId)

      if (translation === translationId) {
        errorMessages.push(error.message)
      } else {
        errorMessages.push(translation)
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

export function useGetCombinedErrorMessages() {
  const { t } = useI18n()

  return {
    getCombinedErrorMessages(
      errors: (CombinedError | { errcode: string; message: string })[]
    ) {
      return getCombinedErrorMessages(t, errors)
    },
  }
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
