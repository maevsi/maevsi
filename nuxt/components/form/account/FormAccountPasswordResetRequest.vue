<template>
  <Form
    :form-class="formClass"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit="accountPasswordResetRequest"
  >
    <FormInputEmailAddress
      id="email-address-password-reset-request"
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
        {{ $t('accountPasswordResetRequest') }}
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
import { email, required } from 'vuelidate/lib/validators'

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
      formSent: undefined,
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
    async accountPasswordResetRequest(e) {
      e.preventDefault()

      this.formSent = true
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
          this.$global.checkNested(data, 'accountPasswordResetRequest')
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
