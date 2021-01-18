<template>
  <Form
    :form-class="formClass"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit.prevent="submit"
  >
    <FormInputUsername
      id="username-register"
      form-key="username"
      :v="$v"
      @blur="$global.blur($v.form, blurFields, 'username', $event)"
      @input="
        blurFields.username ? ($v.form['username'].$model = $event) : null
      "
    />
    <FormInputPassword
      id="password-register"
      form-key="password"
      :v="$v"
      @blur="$global.blur($v.form, blurFields, 'password', $event)"
      @input="
        blurFields.password ? ($v.form['password'].$model = $event) : null
      "
    />
    <FormInputEmailAddress
      id="email-address-register"
      :form-element="$v.form['email-address']"
      required
      @input="$v.form['email-address'].$model = $event"
    />
    <div class="flex flex-col items-center justify-between">
      <ButtonSubmit
        :error="!!graphqlErrorMessage"
        :form="$v.form"
        :form-sent="form.sent"
      >
        {{ $t('register') }}
      </ButtonSubmit>
    </div>
    <CardAlert
      class="mt-4"
      :error-message="graphqlErrorMessage"
      :validation-object="$v.form"
    />
  </Form>
</template>

<script>
import { email, maxLength, minLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_REGISTER_MUTATION from '~/gql/mutation/accountRegister'

const consola = require('consola')

export default {
  props: {
    form: {
      default: undefined,
      type: Object,
    },
    formClass: {
      default: undefined,
      type: String,
    },
  },
  data() {
    return {
      blurFields: {
        password: false,
        username: false,
      },
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
    async submit() {
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
        .then(({ data }) => this.$global.getNested(data, 'accountRegister'))
        .catch((reason) => {
          this.graphqlErrorMessage = reason.toString()
          consola.error(reason)
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
          formatSlug: this.$global.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(this.$global.VALIDATION_USERNAME_LENGTH_MAXIMUM),
          required,
        },
        password: {
          minLength: minLength(this.$global.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        'email-address': {
          email,
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
  emailAddress: 'E-Mail-Adresse'
  register: 'Registrieren'
  registerSuccess: 'Registrierung erfolgreich. Verifiziere deinen Account über den Link, den du in der E-Mail findest, die du in Kürze erhalten wirst.'
en:
  emailAddress: 'Email address'
  register: 'Register'
  registerSuccess: "Registration successful. Verify your account using the link that you can find in the email that you'll receive shortly."
</i18n>
