<template>
  <Form
    :form-class="formClass"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit="register"
  >
    <FormInput
      :error="$v.form['username'].$error"
      label-for="input-username-register"
      :title="$t('username')"
    >
      <input
        id="input-username-register"
        v-model.trim="$v.form.username.$model"
        class="form-input"
        type="text"
        :placeholder="$t('usernamePlaceholder')"
      />
      <div slot="formError">
        <FormError
          :text="$t('globalValidationRequired')"
          :validation-object="$v.form.username"
          validation-property="required"
        />
        <FormError
          :text="$t('globalValidationFormatIncorrect')"
          :validation-object="$v.form.username"
          validation-property="slug"
        />
      </div>
    </FormInput>
    <FormInputPassword id="password-register" form-key="password" :v="$v" />
    <FormInput
      :error="$v.form['email-address'].$error"
      label-for="input-email-address"
      :title="$t('emailAddress')"
    >
      <input
        id="input-email-address"
        v-model.trim="$v.form['email-address'].$model"
        class="form-input"
        type="email"
        :placeholder="$t('emailAddressPlaceholder')"
      />
      <div slot="formError">
        <FormError
          :text="$t('globalValidationRequired')"
          :validation-object="$v.form['email-address']"
          validation-property="required"
        />
        <FormError
          :text="$t('globalValidationFormatIncorrect')"
          :validation-object="$v.form['email-address']"
          validation-property="email"
        />
      </div>
    </FormInput>
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        :icon="false"
        type="submit"
      >
        {{ this.$t('register') }}
      </Button>
    </div>
    <AlertGraphql
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
      class="mt-4"
    />
  </Form>
</template>

<script>
import { email, helpers, minLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_REGISTER_MUTATION from '~/gql/mutation/accountRegister'

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
    async register(e) {
      e.preventDefault()

      this.formSent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_REGISTER_MUTATION,
          variables: {
            username: this.form.username,
            password: this.form.password,
            emailAddress: this.form['email-address'],
          },
        })
        .then(({ data }) => this.$global.checkNested(data, 'accountRegister'))
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
        'email-address': {
          email,
          required,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  emailAddress: 'E-Mail-Adresse'
  emailAddressPlaceholder: 'email@adres.se'
  register: 'Registrieren'
  username: 'Nutzername'
  usernamePlaceholder: 'nutzer-name'
en:
  emailAddress: 'Email address'
  emailAddressPlaceholder: 'email@addre.ss'
  register: 'Register'
  username: 'Username'
  usernamePlaceholder: 'user-name'
</i18n>
