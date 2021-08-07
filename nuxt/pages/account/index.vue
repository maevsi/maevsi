<template>
  <div>
    <CardInfo v-if="$route.query.referrer">
      {{ $t('accountRequired') }}
    </CardInfo>
    <h1>{{ title }}</h1>
    <TabFlip
      ref="tabFlip"
      class="m-auto max-w-lg"
      tab-id-default="signIn"
      :tabs="[
        ['register', $t('register')],
        ['signIn', $t('signIn')],
      ]"
    >
      <template slot="front">
        <FormAccountRegistration
          ref="formRegistration"
          form-class="rounded-t-none"
          @form="onFormRegistration"
          @registered="onRegistered"
        />
      </template>
      <template slot="back">
        <FormAccountSignIn
          ref="formSignIn"
          form-class="rounded-t-none"
          @form="onFormSignIn"
          @password-lost="onClickPasswordForgotten"
        />
        <br />
        <FormAccountPasswordResetRequest
          v-if="showFormPasswordResetRequest"
          ref="formPasswordResetRequest"
          @form="onFormPasswordResetRequest"
          @account-password-reset-request="onAccountPasswordResetRequest"
        />
      </template>
    </TabFlip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { TabFlipType } from '~/components/TabFlip.vue'
import { FormAccountPasswordResetRequestType } from '~/components/form/account/password/FormAccountPasswordResetRequest.vue'
import { FormAccountRegistrationType } from '~/components/form/account/FormAccountRegistration.vue'
import { FormAccountSignInType } from '~/components/form/account/FormAccountSignIn.vue'

export default defineComponent({
  middleware({ app, store, redirect, route }): void {
    if (store.state.jwtDecoded && store.state.jwtDecoded.username) {
      return redirect(
        (route.query.referrer as string) ||
          app.localePath('/account/' + store.state.jwtDecoded.username)
      )
    }
  },
  data() {
    return {
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
  computed: {
    showFormPasswordResetRequest(): boolean {
      return this.$route.query.pw === 'lost'
    },
  },
  methods: {
    onAccountPasswordResetRequest() {
      const formPasswordResetRequest = this.$refs
        .formPasswordResetRequest as FormAccountPasswordResetRequestType
      if (formPasswordResetRequest) {
        formPasswordResetRequest.form.emailAddress = undefined
      }

      ;(
        this.$refs.formRegistration as FormAccountRegistrationType
      ).form.emailAddress = undefined
    },
    onClickPasswordForgotten() {
      const formPasswordResetRequest = this.$refs
        .formPasswordResetRequest as FormAccountPasswordResetRequestType
      if (formPasswordResetRequest) {
        formPasswordResetRequest.form.emailAddress = (
          this.$refs.formRegistration as FormAccountRegistrationType
        ).form.emailAddress
      }
    },
    onFormPasswordResetRequest(form: any) {
      const formRegistration = this.$refs
        .formRegistration as FormAccountRegistrationType
      if (formRegistration.form.emailAddress !== form.emailAddress) {
        formRegistration.form.emailAddress = form.emailAddress
      }
    },
    onFormRegistration(form: any) {
      const formSignIn = this.$refs.formSignIn as FormAccountSignInType
      if (formSignIn.form.username !== form.username) {
        formSignIn.form.username = form.username
      }

      if (formSignIn.form.password !== form.password) {
        formSignIn.form.password = form.password
      }

      const formPasswordResetRequest = this.$refs
        .formPasswordResetRequest as FormAccountPasswordResetRequestType
      if (
        formPasswordResetRequest &&
        formPasswordResetRequest.form.emailAddress !== form.emailAddress
      ) {
        formPasswordResetRequest.form.emailAddress = form.emailAddress
      }
    },
    onFormSignIn(form: any) {
      const formRegistration = this.$refs
        .formRegistration as FormAccountRegistrationType
      if (formRegistration.form.username !== form.username) {
        formRegistration.form.username = form.username
      }
      if (formRegistration.form.password !== form.password) {
        formRegistration.form.password = form.password
      }
    },
    onRegistered() {
      this.resetFormPasswordResetRequest()
      this.resetFormRegistration()
      this.resetFormSignIn()
      ;(this.$refs.tabFlip as TabFlipType).tabSelect('signIn')
    },
    resetFormPasswordResetRequest() {
      const formPasswordResetRequest = this.$refs
        .formPasswordResetRequest as FormAccountPasswordResetRequestType
      if (formPasswordResetRequest) {
        formPasswordResetRequest.form.emailAddress = undefined
        formPasswordResetRequest.$v.form.$reset()
      }
    },
    resetFormRegistration() {
      const formRegistration = this.$refs
        .formRegistration as FormAccountRegistrationType
      formRegistration.form.username = undefined
      formRegistration.form.password = undefined
      formRegistration.form.emailAddress = undefined
      formRegistration.$v.form.$reset()
    },
    resetFormSignIn() {
      const formSignIn = this.$refs.formSignIn as FormAccountSignInType
      formSignIn.form.username = undefined
      formSignIn.form.password = undefined
      formSignIn.$v.form.$reset()
    },
  },
})
</script>

<i18n lang="yml">
de:
  accountRequired: Melde dich an, um fortzufahren.
  register: Registrieren
  signIn: Anmelden
  title: Konto
en:
  accountRequired: Sign in to continue.
  register: Register
  signIn: Sign In
  title: Account
</i18n>
