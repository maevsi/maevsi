<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div class="m-auto max-w-sm">
      <form class="form" @submit="authenticate">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="form-label md:text-right mb-1 md:mb-0" for="input-username">
              Username
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="form-input" id="input-username" type="text" placeholder="Username" v-model="username">
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="form-label md:text-right mb-1 md:mb-0" for="input-password">
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="form-input" id="input-password" type="password" placeholder="Password" v-model="password">
          </div>
        </div>
        <div class="flex flex-col items-center justify-between">
          <button class="btn btn-red" type="sumit">
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
  data() {
    return {
      username: null,
      password: null
    };
  },
  metaInfo() {
    return { title: "Account" };
  },
  methods: {
    authenticate(e) {
      e.preventDefault();

      this.$apollo.query({
        query: gql`query($username: String!, $password: String!) {
            authenticate(username: $username, password: $password)
        }`,
        variables: {
          username: this.username,
          password: this.password
        },
      }).then((data) => {
        if (data.data.authenticate !== null) {
          localStorage.setItem('jwt', data.data.authenticate)
          this.$router.push(this.username)
        }
      }).catch((error) => {
        console.error(error)
      })
    },
  }
};
</script>
