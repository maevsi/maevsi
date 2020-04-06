<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div class="m-auto max-w-lg">
      <div class="grid">
        <div class="e1">
          <ul class="bg-white opacity-75 pills rounded-t">
            <li class="invisible">
              <button>
                [filler]
              </button>
            </li>
          </ul>
        </div>
        <ul class="e1 pills">
          <li
            class="rounded-t bg-white transition-006"
            :class="{ 'translate-x-100': form === 'signin'}"
          >
            <button class="invisible">
              [filler]
            </button>
          </li>
          <li class="invisible">
            <button>
              [filler]
            </button>
          </li>
        </ul>
        <ul class="e1 pills z-0">
          <li>
            <button @click="tabSelect('register')">
              Registration
            </button>
          </li>
          <li>
            <button @click="tabSelect('signin')">
              Sign In
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="flip-card m-auto max-w-lg"
      :class="{ 'flipped': form === 'register'}"
    >
      <div class="flip-card-inner grid">
        <div class="e1 flip-card-front">
          <form
            class="form rounded-t-none"
            @submit="signin"
          >
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="form-label md:text-right mb-1 md:mb-0"
                  for="input-username"
                >
                  Username
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  id="input-username"
                  v-model="username"
                  class="form-input"
                  type="text"
                  placeholder="john-doe"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="form-label md:text-right mb-1 md:mb-0"
                  for="input-password"
                >
                  Password
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  id="input-password"
                  v-model="password"
                  class="form-input"
                  type="password"
                  placeholder="**********"
                >
              </div>
            </div>
            <div class="flex flex-col items-center justify-between">
              <button
                class="btn btn-red"
                type="submit"
              >
                Sign In
              </button>
              <a
                class="disabled inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
                title="Not yet available."
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
        <div class="e1 flip-card-back">
          <form
            class="form rounded-t-none"
            @submit="register"
          >
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="form-label md:text-right mb-1 md:mb-0"
                  for="input-username"
                >
                  Username
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  id="input-username"
                  v-model="username"
                  class="form-input"
                  type="text"
                  placeholder="john-doe"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="form-label md:text-right mb-1 md:mb-0"
                  for="input-password"
                >
                  Password
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  id="input-password"
                  v-model="password"
                  class="form-input"
                  type="password"
                  placeholder="**********"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="form-label md:text-right mb-1 md:mb-0"
                  for="input-password"
                >
                  Email address
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  id="input-password"
                  v-model="password"
                  class="form-input"
                  type="email"
                  placeholder="email@addre.ss"
                >
              </div>
            </div>
            <div class="flex flex-col items-center justify-between">
              <button
                class="btn btn-red"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      username: null,
      password: null,
      form: (this.$route.query.form === undefined) ? 'signin' : this.$route.query.form
    }
  },
  metaInfo () {
    return { title: 'Account' }
  },
  methods: {
    signin (e) {
      e.preventDefault()

      this.$apollo.mutate({
        mutation: gql`mutation ($username: String!, $password: String!) {
          authenticate(input: {username: $username, password: $password}) {
            jwt
          }
        }`,
        variables: {
          username: this.username,
          password: this.password
        }
      }).then((data) => {
        if (data.data.authenticate !== null) {
          localStorage.setItem('jwt', data.data.authenticate.jwt)
          this.$router.push(this.username)
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    register () {

    },
    tabSelect (tab) {
      if (this.form !== tab) {
        this.form = tab
        this.$router.push({ path: '', query: { form: tab } })
      }
    }
  }
}
</script>
