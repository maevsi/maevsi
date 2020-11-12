<template>
  <Form
    :form-class="formClass"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit="signIn"
  >
    <FormInput :error="$v.form['username'].$error" :title="$t('username')">
      <input
        id="input-username-sign-in"
        v-model.trim="$v.form.username.$model"
        class="form-input"
        type="text"
        :placeholder="$t('usernamePlaceholder')"
      />
      <div slot="formError">
        <FormError
          :text="$t('globalValidationRequired')"
          :validation-object="$v.form.username"
          :validation-property="'required'"
        />
        <FormError
          :text="$t('globalValidationFormatIncorrect')"
          :validation-object="$v.form.username"
          :validation-property="'slug'"
        />
      </div>
    </FormInput>
    <FormInputPassword :id="'password'" :v="$v" />
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        :icon="false"
        :type="'submit'"
      >
        {{ $t('signIn') }}
      </Button>
      <nuxt-link
        class="disabled inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4"
        to="#"
        :title="$t('globalAvailabilityNotYet')"
      >
        {{ $t('passwordForgotten') }}
      </nuxt-link>
    </div>
    <AlertGraphql
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
      class="mt-4"
    />
  </Form>
</template>

<script>
import { helpers, minLength, required } from 'vuelidate/lib/validators'

import AUTHENTICATE_MUTATION from '~/gql/mutation/authenticate'

const consola = require('consola')

const slug = helpers.regex('slug', /^[-A-Za-z0-9]+$/)

export default {
  props: {
    form: {
      type: Object,
      default: undefined,
    },
    formClass: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      formSent: undefined,
      graphqlErrorMessage: undefined,
    }
  },
  watch: {
    form: {
      handler(val) {
        this.$emit('password', val)
      },
      deep: true,
    },
  },
  methods: {
    touch(prop) {
      this.$v.form[prop].$touch()
    },
    async signIn(e) {
      e.preventDefault()

      this.formSent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      const res = await this.$apollo
        .mutate({
          mutation: AUTHENTICATE_MUTATION,
          variables: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        .then(({ data }) => this.$global.checkNested(data, 'authenticate'))
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })

      if (!res) {
        return
      }

      this.$global.storeJwt(
        this.$apollo.getClient(),
        this.$store,
        undefined,
        res.jwt
      )
    },
  },
  validations() {
    return {
      form: {
        username: {
          required,
          slug,
        },
        password: {
          minLength: minLength(this.$global.PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  passwordForgotten: 'Passwort vergessen?'
  signIn: 'Anmelden'
  username: 'Nutzername'
  usernamePlaceholder: 'nutzer-name'
en:
  passwordForgotten: 'Forgot password?'
  username: 'Username'
  signIn: 'Sign in'
  usernamePlaceholder: 'user-name'
</i18n>
