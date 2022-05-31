<template>
  <div>
    <h1>{{ title }}</h1>
    <Loader
      v-if="loading || graphqlError"
      :error-message="graphqlError ? String(graphqlError) : undefined"
    />
    <div v-else>
      <p class="text-center">
        {{ $t('emailAddressVerificationSuccess') }}
      </p>
      <ButtonList>
        <ButtonSignIn
          v-if="
            $util.getNested($store.getters.jwtDecoded, 'role') ===
            'maevsi_anonymous'
          "
          :is-referring="false"
        />
        <ButtonHome />
      </ButtonList>
    </div>
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
  data() {
    return {
      graphqlError: undefined as any,
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
