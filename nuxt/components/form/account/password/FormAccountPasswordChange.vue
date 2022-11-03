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

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import consola from 'consola'
import Swal from 'sweetalert2'

import FormType from '~/components/form/Form.vue'
import {
  formPreSubmit,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useAccountPasswordChangeMutation } from '~/gql/generated'

const { t } = useI18n()
const accountPasswordChangeMutation = useAccountPasswordChangeMutation()

// refs
const formRef = ref<typeof FormType>()

// api data
const api = computed(() => ({
  data: {
    ...accountPasswordChangeMutation.data.value,
  },
  ...getApiMeta([accountPasswordChangeMutation]),
}))

// data
const form = reactive({
  passwordCurrent: ref<string>(),
  passwordNew: ref<string>(),
})
const isFormSent = ref(false)

// methods
function resetForm() {
  formRef.value?.reset()
}
async function submit() {
  if (!form.passwordCurrent) throw new Error('Current password is not set!')
  if (!form.passwordNew) throw new Error('New password is not set!')

  try {
    await formPreSubmit(api, v$, isFormSent)
  } catch (error) {
    consola.error(error)
    return
  }

  const result = await accountPasswordChangeMutation.executeMutation({
    passwordCurrent: form.passwordCurrent,
    passwordNew: form.passwordNew,
  })

  if (result.error) {
    api.value.errors.push(result.error)
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
  resetForm()
}

// vuelidate
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
const v$ = useVuelidate(rules, { form })
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
  postgres22023: Your new password is too short! Think of a longer one.
  postgres28P01: Current password incorrect! Check for spelling mistakes.
</i18n>
