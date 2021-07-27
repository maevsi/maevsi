// This file must exist for the i18n module too, as this file's existence enables the Vuex store.

import { decode, JwtPayload } from 'jsonwebtoken'
import { Modal } from '~/types/modal'

export interface State {
  jwt: undefined | string
  jwtDecoded: undefined | JwtPayload
  modals: any[]
  signedInUsername: undefined | string
}

export const state = (): State => ({
  jwt: undefined,
  jwtDecoded: undefined,
  modals: [] as Modal[],
  signedInUsername: undefined,
})

export const mutations = {
  jwtRemove(state: State) {
    this.jwtSet(state, undefined)
  },
  jwtSet(state: State, jwt?: string) {
    const jwtDecoded =
      jwt !== undefined ? (decode(jwt) as JwtPayload) : undefined

    state.jwt = jwt
    state.jwtDecoded = jwtDecoded
    state.signedInUsername =
      jwtDecoded &&
      jwtDecoded.role === 'maevsi_account' &&
      jwtDecoded.exp !== undefined &&
      jwtDecoded.exp > Math.floor(Date.now() / 1000)
        ? jwtDecoded.username
        : undefined
  },
  modalAdd(state: State, data: Partial<Modal>) {
    const dataDefault: Modal = {
      contentBody: undefined,
      id: 'ModalGlobal',
      isVisible: true,
      onSubmit: undefined,
    }

    state.modals.push({ ...dataDefault, ...data })
  },
  modalRemove(state: State, data: Modal) {
    state.modals = state.modals.filter((modal) => {
      return modal.id !== data
    })
  },
}
