<template>
  <Form
    :form-class="formClass"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit.prevent="submit"
  >
    <FormInputEmailAddress
      id="email-address-password-reset-request"
      :form-element="$v.form['email-address']"
      required
      @input="$v.form['email-address'].$model = $event"
    />
    <div class="flex flex-col items-center justify-between">
      <ButtonSubmit
        :error-message="graphqlErrorMessage"
        :form="$v.form"
        :form-sent="form.sent"
      >
        {{ $t('accountPasswordResetRequest') }}
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
import { email, maxLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_PASSWORD_RESET_REQUEST_MUTATION from '~/gql/mutation/accountPasswordResetRequest'

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
    async submit() {
      this.$emit('form-sent')
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_PASSWORD_RESET_REQUEST_MUTATION,
          variables: {
            emailAddress: this.form['email-address'],
          },
        })
        .then(({ data }) =>
          this.$global.getNested(data, 'accountPasswordResetRequest')
        )
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
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
        'email-address': {
          email,
          maxLength: maxLength(this.$global.EMAIL_ADDRESS_LENGTH_MAXIMUM),
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
