<template>
  <Form
    :form-class="formClass"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="password"
      :v="$v"
      @input="$v.form['password'].$model = $event"
    />
    <div class="flex flex-col items-center justify-between">
      <ButtonSubmit
        :error="!!graphqlErrorMessage"
        :form="$v.form"
        :form-sent="form.sent"
      >
        {{ $t('accountPasswordReset') }}
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

import ACCOUNT_PASSWORD_RESET_MUTATION from '~/gql/mutation/accountPasswordReset'

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
        password: undefined,
        sent: false,
      },
      graphqlErrorMessage: undefined,
    }
  },
  methods: {
    async submit() {
      this.form.sent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_PASSWORD_RESET_MUTATION,
          variables: {
            code: this.$route.query.code,
            password: this.form.password,
          },
        })
        .then(({ data }) =>
          this.$global.getNested(data, 'accountPasswordReset')
        )
        .catch((reason) => {
          this.graphqlErrorMessage = reason.toString()
          consola.error(reason)
        })

      if (!res) {
        return
      }

      // this.$emit('account-password-reset')
      alert(this.$t('accountPasswordResetSuccess'))
      this.$router.push({
        path: this.localePath(`/account`),
        query: { ...this.$route.query, form: 'signIn' },
      })
    },
  },
  validations() {
    return {
      form: {
        password: {
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
  accountPasswordReset: 'Passwort zurücksetzen'
  accountPasswordResetSuccess: 'Passwort erfolgreich zurückgesetzt.'
en:
  accountPasswordReset: 'Reset password'
  accountPasswordResetSuccess: 'Password reset successfully.'
</i18n>
