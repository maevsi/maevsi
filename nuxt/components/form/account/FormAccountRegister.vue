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
      <template slot="inputError">
        <FormError
          :validation-object="$v.form.username"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormError>
        <FormError
          :validation-object="$v.form.username"
          validation-property="formatSlug"
        >
          {{ $t('globalValidationFormatIncorrect') }}
        </FormError>
      </template>
    </FormInput>
    <FormInputPassword
      id="password-register"
      form-key="password"
      :v="$v"
      @input="$v.form['password'].$model = $event"
    />
    <FormInputEmailAddress
      id="email-address-register"
      form-key="email-address"
      :v="$v"
      @input="$v.form['email-address'].$model = $event"
    />
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        type="submit"
      >
        {{ $t('register') }}
      </Button>
    </div>
    <CardAlert
      class="mt-4"
      :error-message="graphqlErrorMessage"
      :validation-object="$v.form"
    />
  </Form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_REGISTER_MUTATION from '~/gql/mutation/accountRegister'

const consola = require('consola')

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
      graphqlErrorMessage: undefined,
    }
  },
  watch: {
    form: {
      handler(val) {
        if (JSON.stringify(val) !== '{}') {
          this.$emit('form', val)
        }
      },
      deep: true,
    },
  },
  methods: {
    async register(e) {
      e.preventDefault()

      this.$emit('form-sent')
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

      this.$emit('registered')
      alert(this.$t('registerSuccess'))
    },
  },
  validations() {
    return {
      form: {
        username: {
          required,
          formatSlug: this.$global.VERIFICATION_FORMAT_SLUG,
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
  register: 'Registrieren'
  registerSuccess: 'Registrierung erfolgreich. Verifiziere deinen Account über den Link, den du in der E-Mail findest, die du in Kürze erhalten wirst.'
  username: 'Nutzername'
  usernamePlaceholder: 'nutzer-name'
en:
  emailAddress: 'Email address'
  register: 'Register'
  registerSuccess: "Registration successful. Verify your account using the link that you can find in the email that you'll receive shortly."
  username: 'Username'
  usernamePlaceholder: 'user-name'
</i18n>
