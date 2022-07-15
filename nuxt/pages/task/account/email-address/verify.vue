<template>
  <div>
    <h1>{{ title }}</h1>
    <Loader
      v-if="loading || graphqlError"
      :errors="$util.getGqlErrorMessages(graphqlError, this)"
    />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import consola from 'consola'

import { defineComponent } from '#app'
import ACCOUNT_EMAIL_ADDRESS_VERIFICATION_MUTATION from '~/gql/mutation/account/accountEmailAddressVerification.gql'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, query, redirect }: Context) {
    if (Array.isArray(query.code) || !app.$util.REGEX_UUID.test(query.code)) {
      return redirect(app.localePath('/'))
    }
  },
  transition: {
    name: 'layout',
  },
  data() {
    return {
      graphqlError: undefined as Error | undefined,
      loading: true,
      title: this.$t('title'),
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
  beforeMount() {
    this.accountEmailAddressVerification()
  },
  methods: {
    accountEmailAddressVerification() {
      this.$apollo
        .mutate({
          mutation: ACCOUNT_EMAIL_ADDRESS_VERIFICATION_MUTATION,
          variables: {
            code: this.$route.query.code,
          },
        })
        .then(() => {
          this.$swal({
            icon: 'success',
            text: this.$t('verifiedBody') as string,
            title: this.$t('verified'),
          })
          this.$router.push({
            path: this.localePath(`/task/account/sign-in`),
          })
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
        .finally(() => {
          this.loading = false
        })
    },
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
