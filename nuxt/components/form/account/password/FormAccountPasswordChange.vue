<template>
  <Form
    ref="formRef"
    :errors="api.errors"
    :form="v$.form"
    :is-form-sent="isFormSent"
    :submit-name="t('passwordChange')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="passwordCurrent"
      :form-input="v$.form.passwordCurrent"
      :title="t('passwordCurrent')"
      @input="form.passwordCurrent = $event"
    />
    <FormInputPassword
      id="passwordNew"
      :form-input="v$.form.passwordNew"
      :title="t('passwordNew')"
      @input="form.passwordNew = $event"
    />
  </Form>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import consola from 'consola'
import Swal from 'sweetalert2'
import { reactive, ref, toRef, computed, defineComponent } from 'vue'

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

    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...accountPasswordChangeMutation.data.value,
          },
          ...getApiMeta([accountPasswordChangeMutation]),
        }
      }),
    }
    const data = reactive({
      form: {
        passwordCurrent: '',
        passwordNew: '',
      },
      isFormSent: false,
    })
    const rules = {
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
    const v$ = useVuelidate(rules, data)
    const methods = {
      resetForm() {
        refs.formRef.value?.reset()
      },
      async submit() {
        try {
          await formPreSubmit(apiData, v$, toRef(data, 'isFormSent'))
        } catch (error) {
          consola.debug(error)
          return
        }

        const result = await accountPasswordChangeMutation.executeMutation({
          passwordCurrent: data.form.passwordCurrent,
          passwordNew: data.form.passwordNew,
        })

        if (result.error) {
          apiData.api.value.errors.push(result.error)
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
      t,
    }

    return {
      ...refs,
      ...apiData,
      ...data,
      ...methods,
      v$,
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
  passwordCurrent: Current password
  passwordNew: New password
  postgres22023: The new password is too short! Think about a longer one.
  postgres28P01: Current password incorrect! Check that you have written everything correctly.
</i18n>
