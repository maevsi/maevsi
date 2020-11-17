<template>
  <Form
    :form-class="formClass"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit="accountPasswordReset"
  >
    <FormInputPassword id="password" :v="$v" />
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        :icon="false"
        type="submit"
      >
        {{ $t('accountPasswordReset') }}
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

import ACCOUNT_PASSWORD_RESET_MUTATION from '~/gql/mutation/accountPasswordReset'

const consola = require('consola')

export default {
  props: {
    // form: {
    //   type: Object,
    //   default: undefined,
    // },
    formClass: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      form: {
        password: undefined,
      },
      formSent: undefined,
      graphqlErrorMessage: undefined,
    }
  },
  // watch: {
  //   form: {
  //     handler(val) {
  //       if (JSON.stringify(val) !== '{}') {
  //         this.$emit('form', val)
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    async accountPasswordReset(e) {
      e.preventDefault()

      this.formSent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_PASSWORD_RESET_MUTATION,
          variables: {
            code: this.$router.currentRoute.query.code,
            password: this.form.password,
          },
        })
        .then(({ data }) =>
          this.$global.checkNested(data, 'accountPasswordReset')
        )
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })

      if (!res) {
        return
      }

      // this.$emit('account-password-reset')
      alert(this.$t('accountPasswordResetSuccess'))
      this.$router.push({
        path: this.localePath(`/account`),
        query: { form: 'signIn' },
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
