<template>
  <div>
    <h1>{{ title }}</h1>
    <Loader
      v-if="$apollo.loading || graphqlError"
      :error-message="graphqlError ? String(graphqlError) : undefined"
    />
    <div v-else>
      <p class="text-center">
        {{ $t('emailAddressVerificationSuccess') }}
      </p>
      <ButtonList>
        <ButtonSignIn
          v-if="
            $global.getNested($store.state.jwtDecoded, 'role') ===
            'maevsi_anonymous'
          "
          :is-referring="false"
        />
        <ButtonHome />
      </ButtonList>
    </div>
  </div>
</template>

<script>
import ACCOUNT_EMAIL_ADDRESS_VERIFICATION_MUTATION from '~/gql/mutation/account/accountEmailAddressVerification.gql'
import { defineComponent } from '@nuxtjs/composition-api'

const consola = require('consola')

export default defineComponent({
  middleware({ app, query, redirect }) {
    if (!app.$global.REGEX_UUID.test(query.code)) {
      return redirect(app.localePath('/'))
    }
  },
  data() {
    return {
      graphqlError: undefined,
      loading: true,
      title: this.$t('title'),
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
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
          content: this.title,
        },
      ],
      title: this.title,
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
  title: Verifizierung
en:
  emailAddressVerificationSuccess: Email address verified successfully.
  title: Verification
</i18n>
