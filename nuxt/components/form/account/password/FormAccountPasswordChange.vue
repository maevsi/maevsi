<template>
  <Form
    ref="formRef"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
    :form="v$.form"
    :form-sent="isFormSent"
    :submit-name="$t('passwordChange')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="passwordCurrent"
      :form-input="v$.form.passwordCurrent"
      :title="$t('passwordCurrent')"
      @input="form.passwordCurrent = $event"
    />
    <FormInputPassword
      id="passwordNew"
      :form-input="v$.form.passwordNew"
      :title="$t('passwordNew')"
      @input="form.passwordNew = $event"
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
import ACCOUNT_PASSWORD_CHANGE_MUTATION from '~/gql/mutation/account/accountPasswordChange.gql'
import { FormType } from '~/components/form/Form.vue'

const FormAccountPasswordChange = defineComponent({
  setup() {
    const { $util } = useNuxtApp()
    const data = {
      form: reactive({
        passwordCurrent: undefined as string | undefined,
        passwordNew: undefined as string | undefined,
      }),
      isFormSent: ref(false),
      graphqlError: ref<Error>(),
    }
    const rules = {
      form: {
        passwordCurrent: {
          minLength: minLength($util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        passwordNew: {
          minLength: minLength($util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
    const v$ = useVuelidate(rules, data)
    const refs = {
      formRef: ref<FormType>(),
    }
    const methods = {
      resetForm: () => {
        refs.formRef.value?.reset()
      },
    }
    return {
      ...data,
      ...refs,
      ...methods,
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

      this.$apollo
        .mutate({
          mutation: ACCOUNT_PASSWORD_CHANGE_MUTATION,
          variables: {
            passwordCurrent: this.form.passwordCurrent,
            passwordNew: this.form.passwordNew,
          },
        })
        .then((_value) => {
          Swal.fire({
            icon: 'success',
            text: this.$t('passwordChangeSuccess') as string,
            timer: 3000,
            timerProgressBar: true,
            title: this.$t('changed'),
          })
          this.resetForm()
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
    },
  },
})

export default FormAccountPasswordChange

export type FormAccountPasswordChangeType = InstanceType<
  typeof FormAccountPasswordChange
>
</script>

<i18n lang="yml">
de:
  changed: Geändert!
  passwordChange: Passwort ändern
  passwordChangeSuccess: Passwort erfolgreich geändert.
  passwordCurrent: Aktuelles Passwort
  passwordNew: Neues Passwort
  postgres22023: Das neue Passwort ist zu kurz! Überlege dir ein längeres.
  postgres28P01: Aktuelles Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
en:
  changed: Changed!
  passwordChange: Change password
  passwordChangeSuccess: Password changed successfully.
  passwordCurrent: Current Password
  passwordNew: New Password
  postgres22023: The new password is too short! Think about a longer one.
  postgres28P01: Current password incorrect! Check that you have written everything correctly.
</i18n>
