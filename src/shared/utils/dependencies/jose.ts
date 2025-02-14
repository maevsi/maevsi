import { jwtVerify, importSPKI } from 'jose'

export const verifyJwt = async ({
  jwt,
  jwtPublicKey,
}: {
  jwt: string
  jwtPublicKey: string
}) =>
  await jwtVerify(jwt, await importSPKI(jwtPublicKey, JWT_ALGORITHM), {
    algorithms: [JWT_ALGORITHM],
    audience: 'postgraphile',
    issuer: 'postgraphile',
  })
