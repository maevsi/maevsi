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
