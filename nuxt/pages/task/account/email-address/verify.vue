<template>
  <div>
    <h1>{{ title }}</h1>
    <Loader :api="api" />
  </div>
</template>

<script lang="ts">
import consola from 'consola'
import Swal from 'sweetalert2'
import { computed, defineComponent, reactive } from 'vue'

import { useRoute, useRouter, navigateTo } from '#app'
import { useHead } from '#head'

import { REGEX_UUID } from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useAccountEmailAddressVerificationMutation } from '~/gql/generated'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const localePath = useLocalePath()
      const route = useRoute()

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

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const localePath = useLocalePath()
    const router = useRouter()
    const { t } = useI18n()
    const route = useRoute()
    const accountEmailAddressVerificationMutation =
      useAccountEmailAddressVerificationMutation()

    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...accountEmailAddressVerificationMutation.data.value,
          },
          ...getApiMeta([accountEmailAddressVerificationMutation]),
        }
      }),
    }
    const data = reactive({
      title: t('title'),
    })

    accountEmailAddressVerificationMutation
      .executeMutation({
        code: route.query.code,
      })
      .then((result) => {
        if (result.error) {
          apiData.api.value.errors.push(result.error)
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

    useHead({
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: data.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            router.currentRoute.value.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: data.title,
        },
      ],
      title: data.title,
    })

    return {
      ...apiData,
      ...data,
    }
  },
})
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
  postgresP0002: Unknown verification code! Have you perhaps already verified your email address?
  title: Verification
  verified: Email address verified.
  verifiedBody: You may sign in now.
</i18n>
