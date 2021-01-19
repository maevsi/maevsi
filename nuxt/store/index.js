// This file must exist for the i18n module too, as this file's existence enables the Vuex store.

import { decode } from 'jsonwebtoken'

export const state = () => ({
  jwt: undefined,
  jwtDecoded: undefined,
  signedInUsername: undefined,
})

export const mutations = {
  removeJwt(state) {
    this.setJwt(state, null)
  },
  setJwt(state, jwt) {
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
}
