<template>
  <Form
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
    :form="v$.form"
    :form-class="formClass"
    :form-sent="isFormSent"
    :submit-name="$t('accountPasswordReset')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="password"
      :form-input="v$.form.password"
      :title="$t('passwordNew')"
      @input="form.password = $event"
    />
  </Form>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import consola from 'consola'
import Swal from 'sweetalert2'
import { reactive, ref } from 'vue'

import { defineComponent, useNuxtApp } from '#app'
import ACCOUNT_PASSWORD_RESET_MUTATION from '~/gql/mutation/account/accountPasswordReset.gql'

const FormAccountPasswordReset = defineComponent({
  props: {
    formClass: {
      default: undefined,
      type: String,
    },
  },
  setup() {
    const { $util } = useNuxtApp()
    const data = {
      form: reactive({
        password: undefined as string | undefined,
      }),
      isFormSent: ref(false),
      graphqlError: ref<Error>(),
    }
    const rules = {
      form: {
        password: {
          minLength: minLength($util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
    const v$ = useVuelidate(rules, data)
    return {
      ...data,
      v$,
    }
  },
  methods: {
    async submit() {
      try {
        await this.$util.formPreSubmit(this)
      } catch (error) {
        consola.debug(error)
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

      Swal.fire({
        icon: 'success',
        text: this.$t('accountPasswordResetSuccess') as string,
        timer: 3000,
        timerProgressBar: true,
        title: this.$t('reset'),
      })
      this.$router.push({
        path: this.localePath(`/account`),
        query: { ...this.$route.query, tab: 'signIn' },
      })
    },
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
  passwordNew: Neues Passwort
  postgres22023: Das Passwort ist zu kurz! Überlege dir ein längeres.
  postgresP0002: Unbekannter Zurücksetzungscode! Hast du dein Passwort vielleicht schon zurückgesetzt?
  postgres55000: Der Zurücksetzungscode ist abgelaufen!
  reset: Zurückgesetzt!
en:
  accountPasswordReset: Reset password
  accountPasswordResetSuccess: Password reset successfully.
  passwordNew: New Password
  postgres22023: The password is too short! Think about a longer one.
  postgresP0002: Unknown reset code! Have you perhaps already reset your password?
  postgres55000: The reset code has expired!
  reset: Reset!
</i18n>
