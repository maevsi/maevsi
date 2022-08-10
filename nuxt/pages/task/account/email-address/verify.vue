<template>
  <div>
    <h1>{{ title }}</h1>
    <Loader :api="api" />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import consola from 'consola'
import Swal from 'sweetalert2'

import { defineComponent, reactive, useNuxtApp, useRoute } from '#app'

import { REGEX_UUID } from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useAccountEmailAddressVerificationMutation } from '~/gql/generated'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, query, redirect }: Context) {
    if (Array.isArray(query.code) || !REGEX_UUID.test(query.code)) {
      return redirect(app.localePath('/'))
    }
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { $router, $t, localePath } = useNuxtApp()
    const route = useRoute()
    const accountEmailAddressVerificationMutation =
      useAccountEmailAddressVerificationMutation()

    const apiData = reactive({
      api: {
        data: {
          ...accountEmailAddressVerificationMutation.data.value,
        },
        ...getApiMeta([accountEmailAddressVerificationMutation]),
      },
    })
    const data = reactive({
      title: $t('title'),
    })

    accountEmailAddressVerificationMutation
      .executeMutation({
        code: route.query.code,
      })
      .then((result) => {
        if (result.error) {
          apiData.api.errors.push(result.error)
          consola.error(result.error)
        } else {
          Swal.fire({
            icon: 'success',
            text: $t('verifiedBody') as string,
            title: $t('verified'),
          })
          $router.push({
            path: localePath(`/task/account/sign-in`),
          })
        }
      })

    return {
      ...apiData,
      ...data,
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
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
