// This file must exist for the i18n module too, as this file's existence enables the store.
import { decodeJwt, type JWTPayload } from 'jose'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Modal } from '~/types/modal'

export const useMaevsiStore = defineStore('maevsi', () => {
  const jwt = ref<string>()
  const jwtDecoded = ref<JWTPayload>()
  const modals = ref<Modal[]>([])
  const routerAfterEachs = ref<(() => void | Promise<void>)[]>([])
  const signedInAccountId = ref<string>()
  const signedInUsername = ref<string>()
  const turnstileToken = ref<string>()
  const isSidebarVisible = ref(true)

  const jwtRemove = () => {
    jwtSet(undefined)
  }

  const jwtSet = (jwtNew?: string) => {
    const jwtDecodedNew = jwtNew !== undefined ? decodeJwt(jwtNew) : undefined

    jwt.value = jwtNew
    jwtDecoded.value = jwtDecodedNew
    signedInAccountId.value =
      jwtDecodedNew?.role === 'maevsi_account' &&
      jwtDecodedNew.exp !== undefined &&
      jwtDecodedNew.exp > Math.floor(Date.now() / 1000)
        ? (jwtDecodedNew.account_id as string | undefined)
        : undefined
    signedInUsername.value =
      jwtDecodedNew?.role === 'maevsi_account' &&
      jwtDecodedNew.exp !== undefined &&
      jwtDecodedNew.exp > Math.floor(Date.now() / 1000)
        ? (jwtDecodedNew.account_username as string | undefined)
        : undefined
  }

  const modalRemove = (modalId: string) => {
    modals.value = modals.value.filter((modal) => {
      return modal.id !== modalId
    })
  }

  return {
    isSidebarVisible,
    jwt,
    jwtDecoded,
    modals,
    routerAfterEachs,
    signedInAccountId,
    signedInUsername,
    turnstileToken,
    jwtRemove,
    jwtSet,
    modalRemove,
  }
})
