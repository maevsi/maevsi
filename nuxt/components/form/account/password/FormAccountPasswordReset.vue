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

<script lang="ts">
import consola from 'consola'
import { minLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_PASSWORD_RESET_MUTATION from '~/gql/mutation/account/accountPasswordReset.gql'

import { defineComponent } from '#app'

const FormAccountPasswordReset = defineComponent({
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
        await this.$util.formPreSubmit(this)
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
        .then(({ data }) => this.$util.getNested(data, 'accountPasswordReset'))
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$swal({
        icon: 'success',
        text: this.$t('accountPasswordResetSuccess') as string,
        title: this.$t('reset'),
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
          minLength: minLength(this.$util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
  },
})

export default FormAccountPasswordReset

export type FormAccountPasswordResetType = InstanceType<
  typeof FormAccountPasswordReset
>
</script>

<i18n lang="yml">
de:
  accountPasswordReset: Passwort zurücksetzen
  accountPasswordResetSuccess: Passwort erfolgreich zurückgesetzt.
  reset: Zurückgesetzt!
en:
  accountPasswordReset: Reset password
  accountPasswordResetSuccess: Password reset successfully.
  reset: Reset!
</i18n>
