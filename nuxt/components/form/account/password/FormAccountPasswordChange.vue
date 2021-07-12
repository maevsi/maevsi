<template>
  <Form
    :form="$v.form"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('passwordChange')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="passwordCurrent"
      :v="$v"
      @input="form.passwordCurrent = $event"
    />
    <FormInputPassword
      id="passwordNew"
      :v="$v"
      @input="form.passwordNew = $event"
    />
    <FormInputPassword
      id="passwordNewConfirmation"
      :v="$v"
      @input="form.passwordNewConfirmation = $event"
    >
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.passwordNewConfirmation"
          validation-property="sameAs"
        >
          {{ $t('globalValidationSameAs') }}
        </FormInputError>
      </template>
      <template slot="inputInfo">
        <FormInputInfo>
          {{ $t('passwordConfirmation') }}
        </FormInputInfo>
      </template>
    </FormInputPassword>
  </Form>
</template>

<script>
import { minLength, required, sameAs } from 'vuelidate/lib/validators'

import ACCOUNT_PASSWORD_CHANGE_MUTATION from '~/gql/mutation/account/accountPasswordChange.gql'

const consola = require('consola')

export default {
  data() {
    return {
      form: {
        passwordCurrent: undefined,
        passwordNew: undefined,
        passwordNewConfirmation: undefined,
        sent: false,
      },
      graphqlError: undefined,
    }
  },
  methods: {
    async submit() {
      try {
        await this.$global.formPreSubmit(this)
      } catch (error) {
        return
      }

      this.$apollo
        .mutate({
          mutation: ACCOUNT_PASSWORD_CHANGE_MUTATION,
          variables: {
            passwordCurrent: this.form.passwordCurrent,
            passwordNew: this.form.passwordNew,
          },
        })
        .then((_value) => {
          this.$store.commit('modalAdd', {
            contentBody: this.$t('passwordChangeSuccess'),
          })
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
    },
  },
  validations() {
    return {
      form: {
        passwordCurrent: {
          minLength: minLength(this.$global.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        passwordNew: {
          minLength: minLength(this.$global.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        passwordNewConfirmation: {
          required,
          sameAs: sameAs('passwordNew'),
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  passwordChange: Passwort ändern
  passwordChangeSuccess: Passwort erfolgreich geändert.
  passwordConfirmation: Wiederhole das neue Passwort, um Tippfehler auszuschließen.
en:
  passwordChange: Change password
  passwordChangeSuccess: Password changed successfully.
  passwordConfirmation: Repeat the new password to rule out typos.
</i18n>
