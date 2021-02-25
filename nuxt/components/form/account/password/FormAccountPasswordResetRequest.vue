<template>
  <Form
    :form="$v.form"
    :form-class="formClass"
    :form-sent="form.sent"
    :graphql-error-message="graphqlErrorMessage"
    :submit-name="$t('accountPasswordResetRequest')"
    @submit.prevent="submit"
  >
    <FormInputEmailAddress
      id="email-address-password-reset-request"
      :form-element="$v.form.emailAddress"
      required
      @input="$v.form.emailAddress.$model = $event"
    />
  </Form>
</template>

<script>
import { email, maxLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_PASSWORD_RESET_REQUEST_MUTATION from '~/gql/mutation/account/accountPasswordResetRequest'

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
          mutation: ACCOUNT_PASSWORD_RESET_REQUEST_MUTATION,
          variables: {
            emailAddress: this.form.emailAddress,
            language: this.$i18n.locale,
          },
        })
        .then(({ data }) =>
          this.$global.getNested(data, 'accountPasswordResetRequest')
        )
        .catch((reason) => {
          this.graphqlErrorMessage = reason.toString()
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$emit('account-password-reset-request')
      alert(this.$t('accountPasswordResetRequestSuccess'))
    },
  },
  validations() {
    return {
      form: {
        emailAddress: {
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
  accountPasswordResetRequest: 'Passwort zurücksetzen'
  accountPasswordResetRequestSuccess: 'Anfrage zum Zurücksetzen des Passworts erfolgreich. Vergib ein neues Password über den Link, den du in der E-Mail findest, die du in Kürze erhalten wirst.'
en:
  accountPasswordResetRequest: 'Reset password'
  accountPasswordResetRequestSuccess: "Request to reset the password successful. Set a new password using the link that you can find in the email that you'll receive shortly."
</i18n>
