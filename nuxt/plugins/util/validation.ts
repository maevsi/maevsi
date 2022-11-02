import { helpers } from '@vuelidate/validators'
import { Ref } from 'vue'

import { getApiDataDefault } from './util'

import ACCOUNT_IS_EXISTING_QUERY from '~/gql/query/account/accountIsExisting.gql'
import EVENT_IS_EXISTING_QUERY from '~/gql/query/event/eventIsExisting.gql'

export const REGEX_PHONE_NUMBER =
  /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
export const REGEX_SLUG = /^[-A-Za-z0-9]+$/
export const REGEX_UPPERCASE_NONE = /^[^A-Z]+$/
export const REGEX_URL_HTTPS = /^https:\/\//
export const REGEX_UUID =
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
export const VALIDATION_ADDRESS_LENGTH_MAXIMUM = 300
export const VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM = 320
export const VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM = 10000
export const VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM = 300
export const VALIDATION_EVENT_NAME_LENGTH_MAXIMUM = 100
export const VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM = 100
export const VALIDATION_EVENT_URL_LENGTH_MAXIMUM = 300
export const VALIDATION_FIRST_NAME_LENGTH_MAXIMUM = 100
export const VALIDATION_FORMAT_PHONE_NUMBER = helpers.regex(REGEX_PHONE_NUMBER)
export const VALIDATION_FORMAT_SLUG = helpers.regex(REGEX_SLUG)
export const VALIDATION_FORMAT_UPPERCASE_NONE =
  helpers.regex(REGEX_UPPERCASE_NONE)
export const VALIDATION_FORMAT_URL_HTTPS = helpers.regex(REGEX_URL_HTTPS)
export const VALIDATION_FORMAT_UUID = helpers.regex(REGEX_UUID)
export const VALIDATION_LAST_NAME_LENGTH_MAXIMUM = 100
export const VALIDATION_PASSWORD_LENGTH_MINIMUM = 8
export const VALIDATION_USERNAME_LENGTH_MAXIMUM = 100

export async function formPreSubmit(
  apiData: ReturnType<typeof getApiDataDefault>, // TODO: change to "api"
  v$: any,
  isFormSent: Ref<boolean>
): Promise<boolean> {
  apiData.api.value.errors = []
  v$.value.$touch()

  const isFormValid = await v$.value.$validate()
  isFormSent.value = isFormValid

  if (!isFormValid) {
    throw new Error('Form is invalid!')
  }

  return isFormValid
}

export function validateEventSlug(
  signedInUserName: string,
  invert: boolean,
  exclude?: string
): (value: string) => Promise<boolean> {
  return async (value: string) => {
    const { $urql } = useNuxtApp()

    if (!helpers.req(value)) {
      return true
    }

    if (value === exclude) {
      return true
    }

    const result = await $urql.value
      .query(EVENT_IS_EXISTING_QUERY, {
        slug: signedInUserName,
        authorUsername: value,
      })
      .toPromise()

    if (result.error) return false

    return invert ? !result.data.eventIsExisting : result.data.eventIsExisting
  }
}

export function validateUsername(
  invert?: boolean
): (value: string) => Promise<boolean> {
  return async (value: string) => {
    const { $urql } = useNuxtApp()

    if (!helpers.req(value)) {
      return true
    }

    const result = await $urql.value
      .query(ACCOUNT_IS_EXISTING_QUERY, {
        username: value,
      })
      .toPromise()

    if (result.error) return false

    return invert
      ? !result.data.accountIsExisting
      : result.data.accountIsExisting
  }
}
