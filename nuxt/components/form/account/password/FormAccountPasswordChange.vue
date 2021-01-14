<template>
  <Form
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit="passwordChange"
  >
    <FormInputPassword
      id="passwordCurrent"
      :v="$v"
      @blur="$v.form['passwordCurrent'].$model = $event"
    />
    <FormInputPassword
      id="passwordNew"
      :v="$v"
      @input="$v.form['passwordNew'].$model = $event"
    />
    <div class="flex flex-col items-center justify-between">
      <ButtonSubmit
        :error-message="graphqlErrorMessage"
        :form="$v.form"
        :form-sent="form.sent"
      >
        {{ $t('passwordChange') }}
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
import { minLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_PASSWORD_CHANGE_MUTATION from '~/gql/mutation/accountPasswordChange'

const consola = require('consola')

export default {
  data() {
    return {
      form: {
        passwordCurrent: undefined,
        passwordNew: undefined,
        sent: false,
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
