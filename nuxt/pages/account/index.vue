<template>
  <div>
    <h1>{{ title }}</h1>
    <TabFlip
      class="m-auto max-w-lg"
      tab-id-default="signIn"
      :tabs="[
        ['register', $t('register')],
        ['signIn', $t('signIn')],
      ]"
    >
      <template slot="front">
        <FormAccountRegister
          ref="formRegister"
          :form="formRegister"
          form-class="rounded-t-none"
          @form="onFormRegister"
          @registered="onRegistered"
        />
      </template>
      <template slot="back">
        <FormAccountSignIn
          ref="formSignIn"
          :form="formSignIn"
          form-class="rounded-t-none"
          @form="onFormSignIn"
          @password-forgotten="onClickPasswordForgotten"
        />
        <FormAccountPasswordResetRequest
          v-if="showFormPasswordResetRequest"
          ref="formPasswordResetRequest"
          :form="formPasswordResetRequest"
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
      formRegister: {
        'email-address': undefined,
        password: undefined,
        username: undefined,
      },
      formSignIn: {
        password: undefined,
        username: undefined,
      },
      formPasswordResetRequest: {
        'email-address': undefined,
      },
      showFormPasswordResetRequest: false,
      title: this.$t('title'),
    }
  },
  head() {
    return { title: this.title }
  },
  methods: {
    onAccountPasswordResetRequest() {
      this.showFormPasswordResetRequest = false

      this.formPasswordResetRequest['email-address'] = undefined
      this.formRegister['email-address'] = undefined

      this.$refs.formRegister.$v.form['email-address'].$touch()
    },
    onClickPasswordForgotten() {
      this.showFormPasswordResetRequest = !this.showFormPasswordResetRequest

      if (
        this.showFormPasswordResetRequest &&
        this.formPasswordResetRequest['email-address'] !== undefined &&
        this.formPasswordResetRequest['email-address'] !== ''
      ) {
        this.$nextTick().then(() => {
          this.$refs.formPasswordResetRequest.$v.form['email-address'].$touch()
        })
      }
    },
    onFormPasswordResetRequest(form) {
      if (this.formRegister['email-address'] !== form['email-address']) {
        this.formRegister['email-address'] = form['email-address']
        this.$refs.formRegister.$v.form['email-address'].$touch()
      }
    },
    onFormRegister(form) {
      if (this.formSignIn.username !== form.username) {
        this.formSignIn.username = form.username
        this.$refs.formSignIn.$v.form.username.$touch()
      }

      if (this.formSignIn.password !== form.password) {
        this.formSignIn.password = form.password
        this.$refs.formSignIn.$v.form.password.$touch()
      }

      if (
        this.formPasswordResetRequest['email-address'] !== form['email-address']
      ) {
        this.formPasswordResetRequest['email-address'] = form['email-address']

        if (this.$refs.formPasswordResetRequest) {
          this.$refs.formPasswordResetRequest.$v.form['email-address'].$touch()
        }
      }
    },
    onFormSignIn(form) {
      if (this.formRegister.username !== form.username) {
        this.formRegister.username = form.username
        this.$refs.formRegister.$v.form.username.$touch()
      }

      if (this.formRegister.password !== form.password) {
        this.formRegister.password = form.password
        this.$refs.formRegister.$v.form.password.$touch()
      }
    },
    onRegistered() {
      this.resetFormPasswordResetRequest()
      this.resetFormRegister()
      this.resetFormSignIn()

      this.tabSelect('signIn')
    },
    resetFormPasswordResetRequest() {
      this.formPasswordResetRequest['email-address'] = undefined

      if (this.$refs.formPasswordResetRequest) {
        this.$refs.formPasswordResetRequest.$v.form.$reset()
      }
    },
    resetFormRegister() {
      this.formRegister.username = undefined
      this.formRegister.password = undefined
      this.formRegister['email-address'] = undefined

      this.$refs.formRegister.$v.form.$reset()
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
