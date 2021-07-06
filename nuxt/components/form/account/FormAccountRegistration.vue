<template>
  <Form
    :form="$v.form"
    :form-class="formClass"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('register')"
    @submit.prevent="submit"
  >
    <FormInputUsername
      id="username-registration"
      form-key="username"
      :v="$v"
      @input="form.username = $event"
    />
    <FormInputPassword
      id="password-registration"
      form-key="password"
      :v="$v"
      @input="form.password = $event"
    />
    <FormInputEmailAddress
      id="email-address-registration"
      :form-element="$v.form.emailAddress"
      required
      @input="form.emailAddress = $event"
    />
  </Form>
</template>

<script>
import { email, maxLength, minLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_REGISTRATION_MUTATION from '~/gql/mutation/account/accountRegistration.gql'

const consola = require('consola')

export default {
  props: {
    formClass: {
      default: undefined,
      type: String,
    },
  },
  data() {
    return {
      form: {
        emailAddress: undefined,
        password: undefined,
        sent: false,
        username: undefined,
      },
      graphqlError: undefined,
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
    async submit() {
      try {
        await this.$global.formPreSubmit(this)
      } catch (error) {
        return
      }

      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_REGISTRATION_MUTATION,
          variables: {
            emailAddress: this.form.emailAddress,
            language: this.$i18n.locale,
            password: this.form.password,
            username: this.form.username,
          },
        })
        .then(({ data }) => this.$global.getNested(data, 'accountRegistration'))
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$emit('registered')
      this.$store.commit('modalAdd', {
        contentBody: this.$t('registrationSuccess'),
      })
    },
  },
  validations() {
    return {
      form: {
        username: {
          formatSlug: this.$global.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(this.$global.VALIDATION_USERNAME_LENGTH_MAXIMUM),
          required,
        },
        password: {
          minLength: minLength(this.$global.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        emailAddress: {
          email,
          formatUppercaseNone: this.$global.VALIDATION_FORMAT_UPPERCASE_NONE,
          maxLength: maxLength(
            this.$global.VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM
          ),
          required,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  emailAddress: E-Mail-Adresse
  register: Registrieren
  registrationSuccess: Registrierung erfolgreich. Verifiziere deinen Account über den Link, den du in der E-Mail findest, die du in Kürze erhalten wirst.
en:
  emailAddress: Email address
  register: Register
  registrationSuccess: "Registration successful. Verify your account using the link that you can find in the email that you'll receive shortly."
</i18n>
