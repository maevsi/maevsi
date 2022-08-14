<template>
  <Form
    ref="formRef"
    :errors="api.errors"
    :form="$v.form"
    :is-form-sent="isFormSent"
    :submit-name="$t('passwordChange')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="passwordCurrent"
      :form-input="$v.form.passwordCurrent"
      :title="$t('passwordCurrent')"
      @input="form.passwordCurrent = $event"
    />
    <FormInputPassword
      id="passwordNew"
      :form-input="$v.form.passwordNew"
      :title="$t('passwordNew')"
      @input="form.passwordNew = $event"
    />
  </Form>
</template>

<script lang="ts">
import consola from 'consola'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n-composable'
import { minLength, required } from 'vuelidate/lib/validators'

import { defineComponent, reactive, ref } from '#app'

import { FormType } from '~/components/form/Form.vue'
import {
  formPreSubmit,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useAccountPasswordChangeMutation } from '~/gql/generated'

const FormAccountPasswordChange = defineComponent({
  setup() {
    const { t } = useI18n()
    const accountPasswordChangeMutation = useAccountPasswordChangeMutation()

    const refs = {
      formRef: ref<FormType>(),
    }

    const apiData = reactive({
      api: {
        data: {
          ...accountPasswordChangeMutation.data.value,
        },
        ...getApiMeta([accountPasswordChangeMutation]),
      },
    })
    const data = reactive({
      form: {
        passwordCurrent: '',
        passwordNew: '',
      },
      isFormSent: false,
    })
    const methods = {
      resetForm() {
        refs.formRef.value?.reset()
      },
      async submit() {
        try {
          await formPreSubmit(this)
        } catch (error) {
          return
        }

        const result = await accountPasswordChangeMutation.executeMutation({
          passwordCurrent: data.form.passwordCurrent,
          passwordNew: data.form.passwordNew,
        })

        if (result.error) {
          apiData.api.errors.push(result.error)
          consola.error(result.error)
        }

        if (!result.data) {
          return
        }

        Swal.fire({
          icon: 'success',
          text: t('passwordChangeSuccess') as string,
          timer: 3000,
          timerProgressBar: true,
          title: t('changed'),
        })
        methods.resetForm()
      },
    }

    return {
      ...refs,
      ...apiData,
      ...data,
      ...methods,
    }
  },
  validations() {
    return {
      form: {
        passwordCurrent: {
          minLength: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        passwordNew: {
          minLength: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
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
