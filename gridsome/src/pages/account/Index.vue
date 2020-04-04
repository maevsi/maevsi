<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div class="m-auto max-w-sm">
      <form
        class="form"
        @submit="authenticate"
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
              placeholder="Username"
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
              placeholder="Password"
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
          <!-- TODO
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>-->
        </div>
      </form>
    </div>
    <p>It's not yet possible to register. Stay tuned!</p>
  </Layout>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  metaInfo () {
    return { title: 'Account' }
  },
  methods: {
    authenticate (e) {
      e.preventDefault()

      this.$apollo.mutation({
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
    }
  }
}
</script>
