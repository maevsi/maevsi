<template>
  <div>
    <h1>{{ title }}</h1>
    <Loader :graphql-error-message="graphqlErrorMessage" :loading="loading">
      <p>
        {{ this.$t('emailAddressVerificationSuccess') }}
      </p>
      <ButtonSignIn
        v-if="
          $global.checkNested($store.state.jwtDecoded, 'role') ===
          'maevsi_anonymous'
        "
      />
      <ButtonHome class="m-4" />
    </Loader>
  </div>
</template>

<script>
import ACCOUNT_EMAIL_ADDRESS_VERIFICATION_MUTATION from '~/gql/mutation/accountEmailAddressVerification'

const consola = require('consola')

export default {
  data() {
    return {
      graphqlErrorMessage: undefined,
      loading: true,
      title: this.$t('title'),
    }
  },
  beforeMount() {
    if (this.$route.query.code !== undefined) {
      this.verifyEmailAddress(this.$route.query.code)
    }
  },
  methods: {
    verifyEmailAddress(code) {
      this.$apollo
        .mutate({
          mutation: ACCOUNT_EMAIL_ADDRESS_VERIFICATION_MUTATION,
          variables: {
            code,
          },
        })
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  head() {
    return { title: this.title }
  },
}
</script>

<i18n lang="yml">
de:
  emailAddressVerificationSuccess: 'E-Mail-Adresse erfolgreich verifiziert.'
  title: 'Verifizierung'
en:
  emailAddressVerificationSuccess: 'Email address verified successfully.'
  title: 'Verification'
</i18n>
