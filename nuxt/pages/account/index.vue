<template>
  <div>
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

<script>
export default {
  middleware({ app, store, redirect }) {
    if (store.state.jwtDecoded && store.state.jwtDecoded.username) {
      return redirect(
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
    return { title: this.title }
  },
  computed: {
    showFormPasswordResetRequest() {
      return this.$route.query.pw === 'lost'
    },
  },
  methods: {
    onAccountPasswordResetRequest() {
      if (this.$refs.formPasswordResetRequest) {
        this.$refs.formPasswordResetRequest.form.emailAddress = undefined
      }

      this.$refs.formRegistration.form.emailAddress = undefined
    },
    onClickPasswordForgotten() {
      if (this.$refs.formPasswordResetRequest) {
        this.$refs.formPasswordResetRequest.form.emailAddress = this.$refs.formRegistration.form.emailAddress
      }
    },
    onFormPasswordResetRequest(form) {
      if (this.$refs.formRegistration.form.emailAddress !== form.emailAddress) {
        this.$refs.formRegistration.form.emailAddress = form.emailAddress
      }
    },
    onFormRegistration(form) {
      if (this.$refs.formSignIn.form.username !== form.username) {
        this.$refs.formSignIn.form.username = form.username
      }

      if (this.$refs.formSignIn.form.password !== form.password) {
        this.$refs.formSignIn.form.password = form.password
      }

      if (
        this.$refs.formPasswordResetRequest &&
        this.$refs.formPasswordResetRequest.form.emailAddress !==
          form.emailAddress
      ) {
        this.$refs.formPasswordResetRequest.form.emailAddress =
          form.emailAddress
      }
    },
    onFormSignIn(form) {
      if (this.$refs.formRegistration.form.username !== form.username) {
        this.$refs.formRegistration.form.username = form.username
      }
      if (this.$refs.formRegistration.form.password !== form.password) {
        this.$refs.formRegistration.form.password = form.password
      }
    },
    onRegistered() {
      this.resetFormPasswordResetRequest()
      this.resetFormRegistration()
      this.resetFormSignIn()

      this.$refs.tabFlip.tabSelect('signIn')
    },
    resetFormPasswordResetRequest() {
      if (this.$refs.formPasswordResetRequest) {
        this.$refs.formPasswordResetRequest.form.emailAddress = undefined
        this.$refs.formPasswordResetRequest.$v.form.$reset()
      }
    },
    resetFormRegistration() {
      this.$refs.formRegistration.form.username = undefined
      this.$refs.formRegistration.form.password = undefined
      this.$refs.formRegistration.form.emailAddress = undefined
      this.$refs.formRegistration.$v.form.$reset()
    },
    resetFormSignIn() {
      this.$refs.formSignIn.form.username = undefined
      this.$refs.formSignIn.form.password = undefined
      this.$refs.formSignIn.$v.form.$reset()
    },
  },
}
</script>

<i18n lang="yml">
de:
  register: 'Registrieren'
  signIn: 'Anmelden'
  title: 'Konto'
en:
  register: 'Register'
  signIn: 'Sign In'
  title: 'Account'
</i18n>
