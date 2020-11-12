<template>
  <Form
    :function-submit="passwordChange"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
  >
    <FormInputPassword :id="'passwordCurrent'" :v="$v" />
    <FormInputPassword :id="'passwordNew'" :v="$v" />
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        :icon="false"
        :type="'submit'"
      >
        {{ $t('passwordChange') }}
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
import { minLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_PASSWORD_CHANGE_MUTATION from '~/gql/mutation/accountPasswordChange'

const consola = require('consola')

export default {
  data() {
    return {
      form: {
        passwordCurrent: undefined,
        passwordNew: undefined,
        sent: undefined,
      },
      graphqlErrorMessage: undefined,
    }
  },
  methods: {
    passwordChange(e) {
      e.preventDefault()

      this.form.sent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      this.$apollo
        .mutate({
          mutation: ACCOUNT_PASSWORD_CHANGE_MUTATION,
          variables: {
            passwordCurrent: this.form.passwordCurrent,
            passwordNew: this.form.passwordNew,
          },
        })
        .then((_data) => {
          alert(this.$t('passwordChangeSuccess'))
        })
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })
    },
  },
  validations() {
    return {
      form: {
        passwordCurrent: {
          minLength: minLength(this.$global.PASSWORD_LENGTH_MINIMUM),
          required,
        },
        passwordNew: {
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
  passwordChange: 'Passwort ändern'
  passwordChangeSuccess: 'Passwort erfolgreich geändert.'
en:
  passwordChange: 'Change password'
  passwordChangeSuccess: 'Password changed successfully.'
</i18n>
