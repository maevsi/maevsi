import type { Validation } from '@vuelidate/core'
import {
  email,
  helpers,
  maxLength,
  maxValue,
  minLength,
  minValue,
  required,
} from '@vuelidate/validators'
import type { Client } from '@urql/core'
import { consola } from 'consola'
import type { Ref } from 'vue'
import type { LocationQueryValue, RouteLocationNormalized } from 'vue-router'

import { eventIsExistingQuery } from '~~/gql/documents/queries/event/eventIsExisting'
import { accountByUsernameQuery } from '~~/gql/documents/queries/account/accountByUsername'
import { eventByAuthorAccountIdAndSlugQuery } from '~~/gql/documents/queries/event/eventByAuthorAccountIdAndSlug'
import { getAccountItem } from '~~/gql/documents/fragments/accountItem'
import { EventVisibility } from '~~/gql/generated/graphql'
import { getEventItem } from '~~/gql/documents/fragments/eventItem'

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
  // `required` is implicitly covered by `formatEnum`
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
    ? { existence: helpers.withAsync(validateUsername()) } // TODO: debounce (https://github.com/maevsi/maevsi/issues/1672)
    : {}),
  ...(validateExistenceNone
    ? { existenceNone: helpers.withAsync(validateUsername(true)) } // TODO: debounce (https://github.com/maevsi/maevsi/issues/1672)
    : {}),
  formatSlug: VALIDATION_FORMAT_SLUG,
  lengthMax: maxLength(VALIDATION_USERNAME_LENGTH_MAXIMUM),
  ...(isRequired ? { required } : {}),
})

export const isFormValid = async ({
  v$,
  isFormSent,
}: {
  v$: Ref<Validation>
  isFormSent: Ref<boolean>
}) => {
  v$.value.$touch()

  const isValid = await v$.value.$validate()
  isFormSent.value = isValid

  if (!isValid) {
    consola.error('Form in invalid!')
  }

  return isValid
}

export const isQueryIcFormatValid = (
  ic?: LocationQueryValue | LocationQueryValue[],
) => ic && !Array.isArray(ic) && REGEX_UUID.test(ic)

export const validateAccountExistence = async ({
  isAuthorizationRequired = false,
  route,
}: {
  isAuthorizationRequired?: boolean
  route: RouteLocationNormalized<
    | 'account-edit-username___en'
    | 'account-edit-username___en'
    | 'account-view-username___en'
    | 'event-edit-username-event_name___en'
    | 'event-view-username___en'
    | 'event-view-username-event_name___en'
    | 'event-view-username-event_name-attendance___en'
    | 'event-view-username-event_name-guest___en'
  >
}) => {
  const { $urql } = useNuxtApp()
  const store = useMaevsiStore()

  const accountIsExisting = await $urql.value
    .query(accountByUsernameQuery, {
      username: route.params.username,
    })
    .toPromise()

  if (accountIsExisting.error) {
    throw createError(accountIsExisting.error)
  }

  if (!accountIsExisting.data?.accountByUsername) {
    throw createError({
      statusCode: 404,
    })
    // return abortNavigation({ statusCode: 404 })
  }

  if (
    isAuthorizationRequired &&
    route.params.username !== store.signedInUsername
  ) {
    throw createError({
      statusCode: 403,
    })
    // return abortNavigation({ statusCode: 403 })
  }

  return true
}

export const getAccountByUsername = async ({
  $urql,
  username,
}: {
  $urql: Ref<Client>
  username: string
}) => {
  const accountByUsername = await $urql.value
    .query(accountByUsernameQuery, {
      username,
    })
    .toPromise()

  if (accountByUsername.error) {
    throw new Error(getCombinedErrorMessages([accountByUsername.error]).join())
  }

  return getAccountItem(accountByUsername.data?.accountByUsername)
}

export const getEventByAuthorAccountIdAndSlug = async ({
  $urql,
  authorAccountId,
  slug,
}: {
  $urql: Ref<Client>
  authorAccountId: string
  slug: string
}) => {
  const eventByAuthorAccountIdAndSlug = await $urql.value
    .query(eventByAuthorAccountIdAndSlugQuery, {
      authorAccountId,
      slug,
    })
    .toPromise()

  if (eventByAuthorAccountIdAndSlug.error) {
    throw new Error(
      getCombinedErrorMessages([eventByAuthorAccountIdAndSlug.error]).join(),
    )
  }

  return getEventItem(
    eventByAuthorAccountIdAndSlug.data?.eventByAuthorAccountIdAndSlug,
  )
}

export const validateEventExistence = async (
  route: RouteLocationNormalized<
    | 'event-edit-username-event_name___en'
    | 'event-view-username-event_name___en'
    | 'event-view-username-event_name-attendance___en'
    | 'event-view-username-event_name-guest___en'
  >,
) => {
  const { $urql } = useNuxtApp()

  const account = await getAccountByUsername({
    $urql,
    username: route.params.username,
  })

  if (!account) {
    throw createError({
      statusCode: 404,
    })
    // return abortNavigation({ statusCode: 404 })
  }

  if (
    typeof route.params.event_name !== 'string' ||
    typeof account.id !== 'string'
  ) {
    throw createError({
      statusCode: 500,
    })
    // return abortNavigation({ statusCode: 500 })
  }

  const eventIsExisting = await $urql.value
    .query(eventIsExistingQuery, {
      slug: route.params.event_name,
      authorAccountId: account.id,
    })
    .toPromise()

  if (eventIsExisting.error) {
    throw createError(eventIsExisting.error)
  }

  if (!eventIsExisting.data?.eventIsExisting) {
    throw createError({
      statusCode: 404,
    })
    // return abortNavigation({ statusCode: 404 })
  }

  return true
}

export const validateEventSlug =
  ({
    signedInAccountId,
    invert,
    exclude,
  }: {
    signedInAccountId: string
    invert: boolean
    exclude?: string
  }) =>
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
        authorAccountId: signedInAccountId,
      })
      .toPromise()

    if (result.error) return false

    return invert
      ? !result.data?.eventIsExisting
      : !!result.data?.eventIsExisting
  }

export const validateUsername = (invert?: boolean) => async (value: string) => {
  const { $urql } = useNuxtApp()

  if (!helpers.req(value)) {
    return true
  }

  const result = await $urql.value
    .query(accountByUsernameQuery, {
      username: value,
    })
    .toPromise()

  if (result.error) return false

  return invert
    ? !result.data?.accountByUsername
    : !!result.data?.accountByUsername
}
