import {
  email,
  helpers,
  maxLength,
  maxValue,
  minLength,
  minValue,
  required,
} from '@vuelidate/validators'
import { consola } from 'consola'
import { Ref } from 'vue'

import {
  REGEX_SLUG,
  REGEX_UPPERCASE_NONE,
  REGEX_URL_HTTPS,
  REGEX_UUID,
} from './constants'
import { eventIsExistingQuery } from '~/gql/documents/queries/event/eventIsExisting'
import { accountIsExistingQuery } from '~/gql/documents/queries/account/accountIsExisting'
import { EventVisibility } from '~/gql/generated/graphql'

export const VALIDATION_ADDRESS_LENGTH_MAXIMUM = 300
export const VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM = 254 // source: https://www.dominicsayers.com/isemail/
export const VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM = 1000000
export const VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM = 300
export const VALIDATION_EVENT_NAME_LENGTH_MAXIMUM = 100
export const VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM = 100
export const VALIDATION_FORMAT_SLUG = helpers.regex(REGEX_SLUG)
export const VALIDATION_FORMAT_UPPERCASE_NONE =
  helpers.regex(REGEX_UPPERCASE_NONE)
export const VALIDATION_FORMAT_URL_HTTPS = helpers.regex(REGEX_URL_HTTPS)
export const VALIDATION_FORMAT_UUID = helpers.regex(REGEX_UUID)
export const VALIDATION_NAME_FIRST_LENGTH_MAXIMUM = 100
export const VALIDATION_NAME_LAST_LENGTH_MAXIMUM = 100
export const VALIDATION_PASSWORD_LENGTH_MINIMUM = 8
export const VALIDATION_URL_LENGTH_MAXIMUM = 300
export const VALIDATION_USERNAME_LENGTH_MAXIMUM = 100

export const VALIDATION_PRIMITIVE = ({
  isRequired,
  lengthMax,
  lengthMin,
  valueMax,
  valueMin,
}: {
  isRequired?: boolean
  lengthMax?: number
  lengthMin?: number
  valueMax?: number
  valueMin?: number
}) => ({
  ...(isRequired ? { required } : {}),
  ...(lengthMax ? { lengthMax: maxLength(lengthMax) } : {}),
  ...(lengthMin ? { lengthMin: minLength(lengthMin) } : {}),
  ...(valueMax ? { valueMax: maxValue(valueMax) } : {}),
  ...(valueMin ? { valueMin: minValue(valueMin) } : {}),
})

export const VALIDATION_CAPTCHA = () => ({
  required,
})
export const VALIDATION_EMAIL_ADDRESS = ({
  isRequired,
}: {
  isRequired?: boolean
}) => ({
  email,
  lengthMax: maxLength(VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM),
  ...(isRequired ? { required } : {}),
})
export const VALIDATION_EVENT_VISIBILITY = () => ({
  formatEnum: (value: string) =>
    Object.values(EventVisibility).includes(value as EventVisibility),
  required,
})
export const VALIDATION_UUID = () => ({
  required,
  formatUuid: VALIDATION_FORMAT_UUID,
})
export const VALIDATION_PASSWORD = () => ({
  lengthMin: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
  required,
})
export const VALIDATION_SLUG = ({
  existenceNone,
}: {
  existenceNone: (value: string) => Promise<boolean>
}) => ({
  existenceNone: helpers.withAsync(existenceNone),
  formatSlug: VALIDATION_FORMAT_SLUG,
  lengthMax: maxLength(VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM),
  required,
})
export const VALIDATION_URL = () => ({
  formatUrlHttps: VALIDATION_FORMAT_URL_HTTPS,
  lengthMax: maxLength(VALIDATION_URL_LENGTH_MAXIMUM),
})
export const VALIDATION_USERNAME = ({
  isRequired,
  validateExistence,
  validateExistenceNone,
}: {
  isRequired?: boolean
  validateExistence?: boolean
  validateExistenceNone?: boolean
}) => ({
  ...(validateExistence
    ? { existence: helpers.withAsync(validateUsername()) }
    : {}),
  ...(validateExistenceNone
    ? { existenceNone: helpers.withAsync(validateUsername(true)) }
    : {}),
  formatSlug: VALIDATION_FORMAT_SLUG,
  lengthMax: maxLength(VALIDATION_USERNAME_LENGTH_MAXIMUM),
  ...(isRequired ? { required } : {}),
})

export const isFormValid = async ({
  v$,
  isFormSent,
}: {
  v$: any
  isFormSent: Ref<boolean>
}): Promise<boolean> => {
  v$.value.$touch()

  const isValid = await v$.value.$validate()
  isFormSent.value = isValid

  if (!isValid) {
    consola.error('Form in invalid!')
  }

  return isValid
}

export const validateEventSlug =
  (
    signedInUserName: string,
    invert: boolean,
    exclude?: string,
  ): ((value: string) => Promise<boolean>) =>
  async (value: string) => {
    const { $urql } = useNuxtApp()

    if (!helpers.req(value)) {
      return true
    }

    if (value === exclude) {
      return true
    }

    const result = await $urql.value
      .query(eventIsExistingQuery, {
        slug: value,
        authorUsername: signedInUserName,
      })
      .toPromise()

    if (result.error) return false

    return invert
      ? !result.data?.eventIsExisting
      : !!result.data?.eventIsExisting
  }

export const validateUsername =
  (invert?: boolean): ((value: string) => Promise<boolean>) =>
  async (value: string) => {
    const { $urql } = useNuxtApp()

    if (!helpers.req(value)) {
      return true
    }

    const result = await $urql.value
      .query(accountIsExistingQuery, {
        username: value,
      })
      .toPromise()

    if (result.error) return false

    return invert
      ? !result.data?.accountIsExisting
      : !!result.data?.accountIsExisting
  }
