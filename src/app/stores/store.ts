import * as Sentry from '@sentry/nuxt'
import { decodeJwt, type JWTPayload } from 'jose'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteNamedMapI18n } from 'vue-router/auto-routes'

import type { Modal } from '~/types/modal'

export const useStore = defineStore(SITE_NAME, () => {
  const localePath = useLocalePath()

  const jwt = ref<string>() // TODO: remove (https://github.com/maevsi/vibetype/issues/1720)
  const jwtDecoded = ref<JWTPayload>()
  const modals = ref<Modal[]>([])
  const routeHistory = ref<string[]>([])
  const routeHistoryDisabled = ref<boolean>(false)
  const signedInAccountId = ref<string>()
  const signedInUsername = ref<string>()
  const turnstileToken = ref<string>()

  const jwtRemove = () => {
    jwtSet(undefined)
    Sentry.setUser(null)
  }

  const jwtSet = (jwtNew?: string) => {
    const jwtDecodedNew = jwtNew !== undefined ? decodeJwt(jwtNew) : undefined

    jwt.value = jwtNew
    jwtDecoded.value = jwtDecodedNew

    if (
      jwtDecodedNew?.role === `${SITE_NAME}_account` &&
      jwtDecodedNew.exp !== undefined &&
      jwtDecodedNew.exp > Math.floor(Date.now() / 1000)
    ) {
      signedInAccountId.value = jwtDecodedNew.account_id as string | undefined
      signedInUsername.value = jwtDecodedNew.account_username as
        | string
        | undefined

      Sentry.setUser({
        id: jwtDecodedNew.account_id as string | undefined,
        username: jwtDecodedNew.account_username as string | undefined,
      })
    } else {
      signedInAccountId.value = undefined
      signedInUsername.value = undefined

      Sentry.setUser(null)
    }
  }

  const modalRemove = (modalId: string) => {
    modals.value = modals.value.filter((modal) => {
      return modal.id !== modalId
    })
  }

  const navigateBack = async () => {
    routeHistoryDisabled.value = true
    await navigateTo(
      localePath(
        (routeHistory.value.pop() as keyof RouteNamedMapI18n) || 'index',
      ),
    )
    routeHistoryDisabled.value = false
  }

  return {
    jwt,
    jwtDecoded,
    modals,
    routeHistory,
    routeHistoryDisabled,
    signedInAccountId,
    signedInUsername,
    turnstileToken,
    jwtRemove,
    jwtSet,
    modalRemove,
    navigateBack,
  }
})
