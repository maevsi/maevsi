import { Client } from '@urql/core'
import { helpers } from '@vuelidate/validators'
import { consola } from 'consola'
import { Ref } from 'vue'

import {
  REGEX_PHONE_NUMBER,
  REGEX_SLUG,
  REGEX_UPPERCASE_NONE,
  REGEX_URL_HTTPS,
  REGEX_UUID,
} from './constants'
import { useMaevsiStore } from '~/store'
import { eventIsExistingQuery } from '~/gql/documents/queries/event/eventIsExisting'
import { accountByUsernameQuery } from '~/gql/documents/queries/account/accountByUsername'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'

import { RouteLocationNormalized } from '#vue-router'

export const VALIDATION_ADDRESS_LENGTH_MAXIMUM = 300
export const VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM = 320
export const VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM = 1000000
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

export const validateAccountExistence = async ({
  isAuthorizationRequired = false,
  route,
}: {
  isAuthorizationRequired?: boolean
  route: RouteLocationNormalized
}) => {
  const { $urql } = useNuxtApp()
  const store = useMaevsiStore()

  const accountIsExisting = await $urql.value
    .query(accountByUsernameQuery, {
      username: route.params.username as string,
    })
    .toPromise()

  if (accountIsExisting.error) {
    throw createError(accountIsExisting.error)
  }

  if (!accountIsExisting.data?.accountByUsername) {
    return abortNavigation({ statusCode: 404 })
  }

  if (
    isAuthorizationRequired &&
    route.params.username !== store.signedInUsername
  ) {
    return abortNavigation({ statusCode: 403 })
  }

  return true
}

export const getAccountByUsername = async ({
  $urql,
  username,
}: {
  $urql: Ref<Client>
  username?: string
}) => {
  if (!username) return

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

export const validateEventExistence = async (
  route: RouteLocationNormalized
) => {
  const { $urql } = useNuxtApp()
  const store = useMaevsiStore()

  const account = await getAccountByUsername({
    $urql,
    username: route.params.username as string,
  })

  if (!account) {
    return abortNavigation({ statusCode: 404 })
  }

  if (
    typeof route.params.event_name !== 'string' ||
    typeof account.id !== 'string'
  ) {
    return abortNavigation({ statusCode: 500 })
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
    return abortNavigation({ statusCode: 404 })
  }

  if (route.params.username !== store.signedInUsername) {
    return abortNavigation({ statusCode: 403 })
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
  }): ((value: string) => Promise<boolean>) =>
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

export const validateUsername =
  (invert?: boolean): ((value: string) => Promise<boolean>) =>
  async (value: string) => {
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
