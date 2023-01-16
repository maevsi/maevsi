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
import { useAccountEmailAddressVerificationMutation } from '~/gql/generated'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const route = useRoute()
      const localePath = useLocalePath()

      if (
        Array.isArray(route.query.code) ||
        route.query.code === null ||
        !REGEX_UUID.test(route.query.code)
      ) {
        return navigateTo(localePath('/'))
      }
    },
  ],
})

const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
const fireAlert = useFireAlert()

// api data
const accountEmailAddressVerificationMutation =
  useAccountEmailAddressVerificationMutation()
const api = getApiData([accountEmailAddressVerificationMutation])

// data
const title = t('title')

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
