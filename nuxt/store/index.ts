// This file must exist for the i18n module too, as this file's existence enables the store.
import { decodeJwt, JWTPayload } from 'jose'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Modal } from '~/types/modal'

export const useMaevsiStore = defineStore('maevsi', () => {
  const jwt = ref<string>()
  const jwtDecoded = ref<JWTPayload>()
  const modals = ref<Modal[]>([])
  const signedInUsername = ref<string>()
  const turnstileKey = ref<string>()

  function jwtRemove() {
    jwtSet(undefined)
  }

  function jwtSet(jwtNew?: string) {
    const jwtDecodedNew = jwtNew !== undefined ? decodeJwt(jwtNew) : undefined

    jwt.value = jwtNew
    jwtDecoded.value = jwtDecodedNew
    signedInUsername.value =
      jwtDecodedNew?.role === 'maevsi_account' &&
      jwtDecodedNew.exp !== undefined &&
      jwtDecodedNew.exp > Math.floor(Date.now() / 1000)
        ? (jwtDecodedNew.username as string | undefined)
        : undefined
  }

  function modalRemove(modalId: string) {
    modals.value = modals.value.filter((modal) => {
      return modal.id !== modalId
    })
  }

  return {
    jwt,
    jwtDecoded,
    modals,
    signedInUsername,
    turnstileKey,
    jwtRemove,
    jwtSet,
    modalRemove,
  }
})
