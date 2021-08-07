<template>
  <Form
    :form="$v.form"
    :form-class="formClass"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('accountPasswordReset')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="password"
      :form-input="$v.form.password"
      @input="form.password = $event"
    />
  </Form>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import { defineComponent } from '@nuxtjs/composition-api'
import ACCOUNT_PASSWORD_RESET_MUTATION from '~/gql/mutation/account/accountPasswordReset.gql'

const consola = require('consola')

export default defineComponent({
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
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$store.commit('modalAdd', {
        contentBody: this.$t('accountPasswordResetSuccess'),
      })
      this.$router.push({
        path: this.localePath(`/account`),
        query: { ...this.$route.query, tab: 'signIn' },
      })
    },
  },
  validations() {
    return {
      form: {
        password: {
          minLength: minLength(this.$global.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
  },
})
</script>

<i18n lang="yml">
de:
  accountPasswordReset: Passwort zurücksetzen
  accountPasswordResetSuccess: Passwort erfolgreich zurückgesetzt.
en:
  accountPasswordReset: Reset password
  accountPasswordResetSuccess: Password reset successfully.
</i18n>
