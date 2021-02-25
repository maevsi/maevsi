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
          :form="formRegistration"
          form-class="rounded-t-none"
          @form="onFormRegistration"
          @form-sent="onFormSent(formRegistration)"
          @registered="onRegistered"
        />
      </template>
      <template slot="back">
        <FormAccountSignIn
          ref="formSignIn"
          :form="formSignIn"
          form-class="rounded-t-none"
          @form="onFormSignIn"
          @form-sent="onFormSent(formSignIn)"
          @password-forgotten="onClickPasswordForgotten"
        />
        <Spacer size="'m-4'" />
        <FormAccountPasswordResetRequest
          v-if="showFormPasswordResetRequest"
          ref="formPasswordResetRequest"
          :form="formPasswordResetRequest"
          @form="onFormPasswordResetRequest"
          @form-sent="onFormSent(formPasswordResetRequest)"
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
      formRegistration: {
        emailAddress: undefined,
        password: undefined,
        sent: false,
        username: undefined,
      },
      formSignIn: {
        password: undefined,
        sent: false,
        username: undefined,
      },
      formPasswordResetRequest: {
        emailAddress: undefined,
        sent: false,
      },
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
      this.showFormPasswordResetRequest = false

      this.formPasswordResetRequest['email-address'] = undefined
      this.formRegistration['email-address'] = undefined

      this.$refs.formRegistration.$v.form.emailAddress.$touch()
    },
    onClickPasswordForgotten() {
      if (
        this.showFormPasswordResetRequest &&
        this.formPasswordResetRequest['email-address'] !== undefined &&
        this.formPasswordResetRequest['email-address'] !== ''
      ) {
        this.$nextTick().then(() => {
          this.$refs.formPasswordResetRequest.$v.form.emailAddress.$touch()
        })
      }
    },
    onFormPasswordResetRequest(form) {
      if (this.formRegistration['email-address'] !== form.emailAddress) {
        this.formRegistration['email-address'] = form.emailAddress
        this.$refs.formRegistration.$v.form.emailAddress.$touch()
      }
    },
    onFormRegistration(form) {
      if (this.formSignIn.username !== form.username) {
        this.formSignIn.username = form.username
        this.$refs.formSignIn.$v.form.username.$touch()
      }

      if (this.formSignIn.password !== form.password) {
        this.formSignIn.password = form.password
        this.$refs.formSignIn.$v.form.password.$touch()
      }

      if (
        this.formPasswordResetRequest['email-address'] !== form.emailAddress
      ) {
        this.formPasswordResetRequest['email-address'] = form.emailAddress

        if (this.$refs.formPasswordResetRequest) {
          this.$refs.formPasswordResetRequest.$v.form.emailAddress.$touch()
        }
      }
    },
    onFormSent(form) {
      form.sent = true
    },
    onFormSignIn(form) {
      if (this.formRegistration.username !== form.username) {
        this.formRegistration.username = form.username
        this.$refs.formRegistration.$v.form.username.$touch()
      }

      if (this.formRegistration.password !== form.password) {
        this.formRegistration.password = form.password
        this.$refs.formRegistration.$v.form.password.$touch()
      }
    },
    onRegistered() {
      this.resetFormPasswordResetRequest()
      this.resetFormRegistration()
      this.resetFormSignIn()

      this.$refs.tabFlip.tabSelect('signIn')
    },
    resetFormPasswordResetRequest() {
      this.formPasswordResetRequest['email-address'] = undefined

      if (this.$refs.formPasswordResetRequest) {
        this.$refs.formPasswordResetRequest.$v.form.$reset()
      }
    },
    resetFormRegistration() {
      this.formRegistration.username = undefined
      this.formRegistration.password = undefined
      this.formRegistration['email-address'] = undefined

      this.$refs.formRegistration.$v.form.$reset()
    },
    resetFormSignIn() {
      this.formSignIn.username = undefined
      this.formSignIn.password = undefined

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
