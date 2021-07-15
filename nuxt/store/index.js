// This file must exist for the i18n module too, as this file's existence enables the Vuex store.

import { decode } from 'jsonwebtoken'

export const state = () => ({
  jwt: undefined,
  jwtDecoded: undefined,
  modals: [],
  signedInUsername: undefined,
})

export const mutations = {
  jwtRemove(state) {
    this.jwtSet(state, null)
  },
  jwtSet(state, jwt) {
    const jwtDecoded = decode(jwt)

    state.jwt = jwt
    state.jwtDecoded = decode(jwt)
    state.signedInUsername =
      jwtDecoded &&
      jwtDecoded.role === 'maevsi_account' &&
      jwtDecoded.exp > Math.floor(Date.now() / 1000)
        ? jwtDecoded.username
        : null
  },
  modalAdd(state, data) {
    const dataDefault = {
      contentBody: undefined,
      id: 'ModalGlobal',
      isVisible: true,
      onSubmit: undefined,
    }

    state.modals.push({ ...dataDefault, ...data })
  },
  modalRemove(state, data) {
    state.modals = state.modals.filter((modal) => {
      return modal.id !== data
    })
  },
}
