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
            class="rounded-t bg-white duration-700"
            :class="{ 'transform translate-x-full': form === 'signin'}"
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
              'error shake': registerGraphqlErrorMessage !== undefined && !$v.formRegister.$dirty
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
              <Button
                :disabled="!((formRegister.sent ? $v.formRegister.$anyDirty : $v.formRegister.$dirty) && !$v.formRegister.$error)"
                :icon="false"
                :text="'Register'"
                type="submit"
              />
            </div>
            <AlertGraphql
              :graphql-error-message="registerGraphqlErrorMessage"
              :validation-object="$v.formRegister"
            />
          </form>
        </div>
        <div class="e1 flip-card-front">
          <form
            class="form rounded-t-none"
            :class="{
              'error shake': signinGraphqlErrorMessage !== undefined && !$v.formSignin.$dirty
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
              <Button
                :disabled="!((formSignin.sent ? $v.formSignin.$anyDirty : $v.formSignin.$dirty) && !$v.formSignin.$error)"
                :icon="false"
                :text="'Sign In'"
                type="submit"
              />
              <a
                class="disabled inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mb-6"
                href="#"
                title="Not yet available."
              >
                Forgot Password?
              </a>
            </div>
            <AlertGraphql
              :graphql-error-message="signinGraphqlErrorMessage"
              :validation-object="$v.formSignin"
            />
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { ACCOUNT_REGISTER_MUTATION, AUTHENTICATE_MUTATION } from '~/apollo/documents'
import AlertGraphql from '~/components/AlertGraphql.vue'
import Button from '~/components/Button.vue'
import FormError from '~/components/FormError.vue'

import { email, helpers, minLength, required } from 'vuelidate/lib/validators'

const slug = helpers.regex('slug', /^[-A-Za-z0-9_]+$/)

export default {
  components: {
    AlertGraphql,
    Button,
    FormError
  },
  data () {
    return {
      formRegister: {
        registerEmailAddress: undefined,
        registerPassword: undefined,
        registerUsername: undefined,
        sent: undefined
      },
      formSignin: {
        sent: undefined,
        signinPassword: undefined,
        signinUsername: undefined
      },
      form: (this.$route.query.form === undefined) ? 'signin' : this.$route.query.form,
      registerGraphqlErrorMessage: undefined,
      signinGraphqlErrorMessage: undefined
    }
  },
  metaInfo () {
    return { title: 'Account' }
  },
  watch: {
    formRegister: {
      handler (val) {
        if (this.formSignin.signinPassword !== val.registerPassword) {
          this.formSignin.signinPassword = val.registerPassword
          this.$v.formSignin.signinPassword.$touch()
        }

        if (this.formSignin.signinUsername !== val.registerUsername) {
          this.formSignin.signinUsername = val.registerUsername
          this.$v.formSignin.signinUsername.$touch()
        }
      },
      deep: true
    },
    formSignin: {
      handler (val) {
        if (this.formRegister.registerPassword !== val.signinPassword) {
          this.formRegister.registerPassword = val.signinPassword
          this.$v.formRegister.registerPassword.$touch()
        }

        if (this.formRegister.registerUsername !== val.signinUsername) {
          this.formRegister.registerUsername = val.signinUsername
          this.$v.formRegister.registerUsername.$touch()
        }
      },
      deep: true
    }
  },
  created () {
    this.$jwtDecode((jwt, jwtDecoded) => {
      if (jwtDecoded.username !== null && jwtDecoded.username !== '') {
        this.$router.push(jwtDecoded.username)
      }
    })
  },
  methods: {
    signin (e) {
      e.preventDefault()

      this.formSignin.sent = true
      this.signinGraphqlErrorMessage = undefined

      this.$v.formSignin.$reset()
      this.$apollo.mutate({
        mutation: AUTHENTICATE_MUTATION,
        variables: {
          username: this.formSignin.signinUsername,
          password: this.formSignin.signinPassword
        }
      }).then((data) => {
        if (data.data.authenticate !== null) {
          localStorage.setItem('jwt_anonymous', localStorage.getItem('jwt'))
          localStorage.setItem('jwt', data.data.authenticate.jwt)
          this.$router.push(this.formSignin.signinUsername)
          location.reload() // Invalidate cached components.
        }
      }).catch((error) => {
        this.signinGraphqlErrorMessage = error.message
        console.error(error)
      })
    },
    register (e) {
      e.preventDefault()

      this.formRegister.sent = true
      this.registerGraphqlErrorMessage = undefined

      this.$v.formRegister.$reset()
      this.$apollo.mutate({
        mutation: ACCOUNT_REGISTER_MUTATION,
        variables: {
          username: this.formRegister.registerUsername,
          password: this.formRegister.registerPassword,
          emailAddress: this.formRegister.registerEmailAddress
        }
      }).then((data) => {
        if (data.data.accountRegister !== null) {
          localStorage.setItem('jwt_anonymous', localStorage.getItem('jwt'))
          localStorage.setItem('jwt', data.data.accountRegister.jwt)
          this.$router.push(this.formRegister.registerUsername)
          location.reload() // Invalidate cached components.
        }
      }).catch((error) => {
        this.registerGraphqlErrorMessage = error.message
        console.error(error)
      })
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
