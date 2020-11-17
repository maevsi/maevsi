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
        <div class="e1 flip-card-back">
          <FormRegister
            ref="formRegister"
            :form="formRegister"
            form-class="rounded-t-none"
            @password="onPasswordRegister"
            @registered="onRegistered"
          />
        </div>
        <div class="e1 flip-card-front">
          <FormSignIn
            ref="formSignIn"
            :form="formSignIn"
            form-class="rounded-t-none"
            @password="onPasswordSignIn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ query }) {
    return {
      form: query.form === undefined ? 'signIn' : query.form,
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
      password: undefined,
      title: this.$t('title'),
      username: undefined,
    }
  },
  middleware({ app, store, redirect }) {
    if (store.state.jwtDecoded && store.state.jwtDecoded.username) {
      return redirect(
        app.localePath('/account/' + store.state.jwtDecoded.username)
      )
    }
  },
  methods: {
    onPasswordSignIn(val) {
      if (this.formRegister.password !== val.password) {
        this.formRegister.password = val.password
        this.$refs.formRegister.touch('password')
      }

      if (this.formRegister.username !== val.username) {
        this.formRegister.username = val.username
        this.$refs.formRegister.touch('username')
      }
    },
    onPasswordRegister(val) {
      if (this.formSignIn.password !== val.password) {
        this.formSignIn.password = val.password
        this.$refs.formSignIn.touch('password')
      }

      if (this.formSignIn.username !== val.username) {
        this.formSignIn.username = val.username
        this.$refs.formSignIn.touch('username')
      }
    },
    onRegistered() {
      this.$refs.formSignIn.$v.$reset()
      this.$router.push(
        this.localePath({ path: '', query: { form: 'signIn' } })
      )
    },
    tabSelect(tab) {
      if (this.$router.currentRoute.params.form !== tab) {
        this.$router.replace({ path: '', query: { form: tab } })
      }
    },
  },
  head() {
    return { title: this.title }
  },
  watchQuery: ['form'],
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
