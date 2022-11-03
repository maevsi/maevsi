<template>
  <div>
    <h1>{{ title }}</h1>
    <Loader :api="api" />
  </div>
</template>

<script setup lang="ts">
import consola from 'consola'
import Swal from 'sweetalert2'

import { REGEX_UUID } from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
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
const accountEmailAddressVerificationMutation =
  useAccountEmailAddressVerificationMutation()

// api data
const api = computed(() => ({
  data: {
    ...accountEmailAddressVerificationMutation.data.value,
  },
  ...getApiMeta([accountEmailAddressVerificationMutation]),
}))

// data
const title = t('title')

// initialization
useHeadDefault(title)
accountEmailAddressVerificationMutation
  .executeMutation({
    code: route.query.code,
  })
  .then((result) => {
    if (result.error) {
      api.value.errors.push(result.error)
      consola.error(result.error)
    } else {
      Swal.fire({
        icon: 'success',
        text: t('verifiedBody') as string,
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

<i18n lang="yml">
de:
  emailAddressVerificationSuccess: E-Mail-Adresse erfolgreich verifiziert.
  postgres55000: Der Verifizierungscode ist abgelaufen!
  postgresP0002: Unbekannter Verifizierungscode! Hast du deine E-Mail-Adresse vielleicht schon verifiziert?
  title: Verifizierung
  verified: E-Mail-Adresse verifiziert.
  verifiedBody: Du kannst dich nun anmelden.
en:
  emailAddressVerificationSuccess: Email address verified successfully.
  postgres55000: The verification code has expired!
  postgresP0002: Invalid verification code! Have you perhaps already verified your email address?
  title: Verification
  verified: Email address verified.
  verifiedBody: You may sign in now.
</i18n>
