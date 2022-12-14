<template>
  <div>
    <h1>{{ title }}</h1>
    <Loader
      :api="api"
      :error-pg-ids="{
        postgres55000: t('postgres55000'),
        postgresP0002: t('postgresP0002'),
      }"
    />
  </div>
</template>

<script setup lang="ts">
import consola from 'consola'

import { useAccountEmailAddressVerificationMutation } from '~/gql/generated'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const { $localePath } = useNuxtApp()
      const route = useRoute()

      if (
        Array.isArray(route.query.code) ||
        route.query.code === null ||
        !REGEX_UUID.test(route.query.code)
      ) {
        return navigateTo($localePath('/'))
      }
    },
  ],
})

const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
const fireAlert = useFireAlert()
const accountEmailAddressVerificationMutation =
  useAccountEmailAddressVerificationMutation()

// api data
const api = computed(() =>
  reactive({
    data: {
      ...accountEmailAddressVerificationMutation.data.value,
    },
    ...getApiMeta([accountEmailAddressVerificationMutation]),
  })
)

// data
const title = t('title')

// lifecycle
// TODO: watch all api errors like this (https://github.com/maevsi/maevsi/issues/961)
watch(
  () => api.value.errors,
  (currentValue, oldValue) => {
    currentValue
      .filter((c) => !oldValue.includes(c))
      .forEach((c) => consola.error(c))
  }
)

// initialization
useHeadDefault(title)
accountEmailAddressVerificationMutation
  .executeMutation({
    code: route.query.code,
  })
  .then(async (result) => {
    if (!result.error) {
      await fireAlert({
        level: 'success',
        text: t('verifiedBody'),
        title: t('verified'),
      })
      navigateTo({
        path: localePath(`/task/account/sign-in`),
      })
    }
  })
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yaml">
de:
  postgres55000: Der Verifizierungscode ist abgelaufen!
  postgresP0002: Unbekannter Verifizierungscode! Hast du deine E-Mail-Adresse vielleicht schon verifiziert?
  title: Verifizierung
  verified: E-Mail-Adresse verifiziert.
  verifiedBody: Du kannst dich nun anmelden.
en:
  postgres55000: The verification code has expired!
  postgresP0002: Invalid verification code! Have you perhaps already verified your email address?
  title: Verification
  verified: Email address verified.
  verifiedBody: You may sign in now.
</i18n>
