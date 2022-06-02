<template>
  <div>
    <CardStateInfo
      v-if="$route.query.referrer && !$route.query.isRedirectNoticeHidden"
    >
      {{ $t('accountRequired') }}
    </CardStateInfo>
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
import { Context } from '@nuxt/types-edge'

import { defineComponent, ref } from '#app'
import { TabFlipType } from '~/components/TabFlip.vue'
import { FormAccountPasswordResetRequestType } from '~/components/form/account/password/FormAccountPasswordResetRequest.vue'
import { FormAccountRegistrationType } from '~/components/form/account/FormAccountRegistration.vue'
import { FormAccountSignInType } from '~/components/form/account/FormAccountSignIn.vue'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, store, redirect, route }: Context): void {
    if (store.getters.jwtDecoded && store.getters.jwtDecoded.username) {
      return redirect(
        route.query.referrer ||
          app.localePath('/account/' + store.getters.jwtDecoded.username)
      )
    }
  },
  setup() {
    const formPasswordResetRequest = ref<FormAccountPasswordResetRequestType>()
    const formRegistration = ref<FormAccountRegistrationType>()
    const formSignIn = ref<FormAccountSignInType>()
    const tabFlip = ref<TabFlipType>()

    const onAccountPasswordResetRequest = () => {
      if (formPasswordResetRequest.value) {
        formPasswordResetRequest.value.form.emailAddress = undefined
      }

      if (formRegistration.value) {
        formRegistration.value.form.emailAddress = undefined
      }
    }

    const onClickPasswordForgotten = () => {
      if (formPasswordResetRequest.value) {
        formPasswordResetRequest.value.form.emailAddress =
          formRegistration.value?.form.emailAddress
      }
    }

    const onFormPasswordResetRequest = (form: any) => {
      if (
        formRegistration.value &&
        formRegistration.value.form.emailAddress !== form.emailAddress
      ) {
        formRegistration.value.form.emailAddress = form.emailAddress
      }
    }

    const onFormRegistration = (form: any) => {
      if (
        formSignIn.value &&
        formSignIn.value.form.username !== form.username
      ) {
        formSignIn.value.form.username = form.username
      }

      if (
        formSignIn.value &&
        formSignIn.value.form.password !== form.password
      ) {
        formSignIn.value.form.password = form.password
      }

      if (
        formPasswordResetRequest.value &&
        formPasswordResetRequest.value.form.emailAddress !== form.emailAddress
      ) {
        formPasswordResetRequest.value.form.emailAddress = form.emailAddress
      }
    }

    const onFormSignIn = (form: any) => {
      if (
        formRegistration.value &&
        formRegistration.value.form.username !== form.username
      ) {
        formRegistration.value.form.username = form.username
      }
      if (
        formRegistration.value &&
        formRegistration.value.form.password !== form.password
      ) {
        formRegistration.value.form.password = form.password
      }
    }

    const onRegistered = () => {
      resetFormPasswordResetRequest()
      resetFormRegistration()
      resetFormSignIn()
      tabFlip.value?.tabSelect('signIn')
    }

    const resetFormPasswordResetRequest = () => {
      if (formPasswordResetRequest.value) {
        formPasswordResetRequest.value.form.emailAddress = undefined
        formPasswordResetRequest.value.$v.form.$reset()
      }
    }

    const resetFormRegistration = () => {
      if (formRegistration.value) {
        formRegistration.value.form.username = undefined
        formRegistration.value.form.password = undefined
        formRegistration.value.form.emailAddress = undefined
        formRegistration.value.$v.form.$reset()
      }
    }

    const resetFormSignIn = () => {
      if (formSignIn.value) {
        formSignIn.value.form.username = undefined
        formSignIn.value.form.password = undefined
        formSignIn.value.$v.form.$reset()
      }
    }

    return {
      formPasswordResetRequest,
      formRegistration,
      formSignIn,
      tabFlip,
      onAccountPasswordResetRequest,
      onClickPasswordForgotten,
      onFormPasswordResetRequest,
      onFormRegistration,
      onFormSignIn,
      onRegistered,
      resetFormPasswordResetRequest,
      resetFormRegistration,
      resetFormSignIn,
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
