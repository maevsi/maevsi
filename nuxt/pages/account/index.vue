<template>
  <div>
    <h1>{{ $t('title') }}</h1>
    <div class="m-auto max-w-lg">
      <div class="grid">
        <div class="e1">
          <ul class="bg-white opacity-75 pills rounded-t">
            <li class="invisible">
              <button>[filler]</button>
            </li>
          </ul>
        </div>
        <ul class="e1 pills">
          <li
            class="rounded-t bg-white duration-700"
            :class="{ 'transform translate-x-full': form === 'signIn' }"
          >
            <button class="invisible">[filler]</button>
          </li>
          <li class="invisible">
            <button>[filler]</button>
          </li>
        </ul>
        <ul class="e1 pills z-0">
          <li>
            <button @click="tabSelect('register')">
              {{ $t('register') }}
            </button>
          </li>
          <li>
            <button @click="tabSelect('signIn')">
              {{ $t('signIn') }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="flip-card m-auto max-w-lg"
      :class="{ flipped: form === 'register' }"
    >
      <div class="flip-card-inner grid">
        <div class="e1 flip-card-front">
          <FormAccountRegister
            ref="formRegister"
            :form="formRegister"
            form-class="rounded-t-none"
            @form="onFormRegister"
            @registered="onRegistered"
          />
        </div>
        <div class="e1 flip-card-back">
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
        </div>
      </div>
    </div>
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
      form:
        this.$route.query.form === undefined
          ? 'signIn'
          : this.$route.query.form,
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
      password: undefined,
      showFormPasswordResetRequest: false,
      title: this.$t('title'),
      username: undefined,
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
    tabSelect(tab) {
      this.form = tab // Setting this via `watchQuery` resets all forms.

      if (this.$router.currentRoute.params.form !== tab) {
        this.$router.replace({ path: '', query: { form: tab } })
      }
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
