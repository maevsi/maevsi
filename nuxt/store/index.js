// This file must exist for the i18n module too, as this file's existence enables the Vuex store.

import { decode } from 'jsonwebtoken'

export const state = () => ({
  jwt: null,
  jwtDecoded: null,
})

export const mutations = {
  removeJwt(state) {
    this.setJwt(state, null)
  },
  setJwt(state, jwt) {
    state.jwt = jwt
    state.jwtDecoded = decode(jwt)
  },
}
