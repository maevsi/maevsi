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
        <div class="e1 flip-card-back">
          <form
            class="form rounded-t-none"
            :class="{
              'error shake': graphqlErrorMessage !== undefined && !$v.formRegister.$dirty
            }"
            @submit="register"
          >
            <div
              :class="{ 'form-error shake': $v.formRegister.registerUsername.$error }"
              class="md:flex md:items-center"
            >
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
                  v-model.trim="$v.formRegister.registerUsername.$model"
                  class="form-input"
                  type="text"
                  placeholder="john-doe"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3" />
              <div class="md:w-2/3">
                <FormError
                  :text="'required'"
                  :trigger="$v.formRegister.registerUsername.$error && !$v.formRegister.registerUsername.required"
                />
                <FormError
                  :text="'invalid format'"
                  :trigger="$v.formRegister.registerUsername.$error && !$v.formRegister.registerUsername.slug"
                />
              </div>
            </div>
            <div
              :class="{ 'form-error shake': $v.formRegister.registerPassword.$error }"
              class="md:flex md:items-center"
            >
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
                  v-model.trim="$v.formRegister.registerPassword.$model"
                  class="form-input"
                  type="password"
                  placeholder="**********"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3" />
              <div class="md:w-2/3">
                <FormError
                  :text="'required'"
                  :trigger="$v.formRegister.registerPassword.$error && !$v.formRegister.registerPassword.required"
                />
                <FormError
                  :text="'too short'"
                  :trigger="$v.formRegister.registerPassword.$error && !$v.formRegister.registerPassword.minLength"
                />
              </div>
            </div>
            <div
              :class="{ 'form-error shake': $v.formRegister.registerEmailAddress.$error }"
              class="md:flex md:items-center"
            >
              <div class="md:w-1/3">
                <label
                  class="form-label md:text-right mb-1 md:mb-0"
                  for="input-email-address"
                >
                  Email address
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  id="input-email-address"
                  v-model.trim="$v.formRegister.registerEmailAddress.$model"
                  class="form-input"
                  type="email"
                  placeholder="email@addre.ss"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3" />
              <div class="md:w-2/3">
                <FormError
                  :text="'required'"
                  :trigger="$v.formRegister.registerEmailAddress.$error && !$v.formRegister.registerEmailAddress.required"
                />
                <FormError
                  :text="'invalid format'"
                  :trigger="$v.formRegister.registerEmailAddress.$error && !$v.formRegister.registerEmailAddress.email"
                />
              </div>
            </div>
            <div class="flex flex-col items-center justify-between">
              <button
                class="btn btn-red"
                :class="{ 'disabled': !($v.formRegister.$dirty && !$v.formRegister.$error) }"
                :disabled="!($v.formRegister.$dirty && !$v.formRegister.$error)"
                type="submit"
              >
                Register
              </button>
            </div>
            <AlertGraphql
              :graphql-error-message="graphqlErrorMessage"
              :validation-object="$v.formRegister"
            />
          </form>
        </div>
        <div class="e1 flip-card-front">
          <form
            class="form rounded-t-none"
            :class="{
              'error shake': graphqlErrorMessage !== undefined && !$v.formSignin.$dirty
            }"
            @submit="signin"
          >
            <div
              :class="{ 'form-error shake': $v.formSignin.signinUsername.$error }"
              class="md:flex md:items-center"
            >
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
                  v-model.trim="$v.formSignin.signinUsername.$model"
                  class="form-input"
                  type="text"
                  placeholder="john-doe"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3" />
              <div class="md:w-2/3">
                <FormError
                  :text="'required'"
                  :trigger="$v.formSignin.signinUsername.$error && !$v.formSignin.signinUsername.required"
                />
                <FormError
                  :text="'invalid format'"
                  :trigger="$v.formSignin.signinUsername.$error && !$v.formSignin.signinUsername.slug"
                />
              </div>
            </div>
            <div
              :class="{ 'form-error shake': $v.formSignin.signinPassword.$error }"
              class="md:flex md:items-center"
            >
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
                  v-model.trim="$v.formSignin.signinPassword.$model"
                  class="form-input"
                  type="password"
                  placeholder="**********"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3" />
              <div class="md:w-2/3">
                <FormError
                  :text="'required'"
                  :trigger="$v.formSignin.signinPassword.$error && !$v.formSignin.signinPassword.required"
                />
                <FormError
                  :text="'too short'"
                  :trigger="$v.formSignin.signinPassword.$error && !$v.formSignin.signinPassword.minLength"
                />
              </div>
            </div>
            <div class="flex flex-col items-center justify-between">
              <button
                class="btn btn-red"
                :class="{ 'disabled': !($v.formSignin.$dirty && !$v.formSignin.$error) }"
                :disabled="!($v.formSignin.$dirty && !$v.formSignin.$error)"
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
            <AlertGraphql
              :graphql-error-message="graphqlErrorMessage"
              :validation-object="$v.formSignin"
            />
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import AlertGraphql from '~/components/AlertGraphql.vue'
import FormError from '~/components/FormError.vue'
import gql from 'graphql-tag'
import { email, helpers, minLength, required } from 'vuelidate/lib/validators'

const slug = helpers.regex('slug', /^[-A-Za-z0-9_]+$/)

export default {
  components: {
    AlertGraphql,
    FormError
  },
  data () {
    return {
      formRegister: {
        registerEmailAddress: '',
        registerPassword: '',
        registerUsername: ''
      },
      formSignin: {
        signinPassword: '',
        signinUsername: ''
      },
      graphqlErrorMessage: undefined,
      form: (this.$route.query.form === undefined) ? 'signin' : this.$route.query.form
    }
  },
  metaInfo () {
    return { title: 'Account' }
  },
  watch: {
    formRegister: {
      handler (val) {
        this.formSignin.signinPassword = val.registerPassword
        this.formSignin.signinUsername = val.registerUsername
      },
      deep: true
    },
    formSignin: {
      handler (val) {
        this.formRegister.registerPassword = val.signinPassword
        this.formRegister.registerUsername = val.signinUsername
      },
      deep: true
    }
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
  },
  validations: {
    formRegister: {
      registerUsername: {
        required,
        slug
      },
      registerPassword: {
        minLength: minLength(8),
        required
      },
      registerEmailAddress: {
        email,
        required
      }
    },
    formSignin: {
      signinUsername: {
        required,
        slug
      },
      signinPassword: {
        minLength: minLength(8),
        required
      }
    }
  }
}
</script>
