<template>
  <Form
    ref="formRef"
    :errors="api.errors"
    :errors-pg-ids="{
      postgres22023: t('postgres22023'),
      postgres28P01: t('postgres28P01'),
    }"
    :form="v$"
    :is-form-sent="isFormSent"
    :submit-name="t('passwordChange')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="passwordCurrent"
      :form-input="v$.passwordCurrent"
      :title="t('passwordCurrent')"
      @input="form.passwordCurrent = $event"
    />
    <FormInputPassword
      id="passwordNew"
      :form-input="v$.passwordNew"
      :title="t('passwordNew')"
      @input="form.passwordNew = $event"
    />
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'

import type FormType from '~/components/form/Form.vue'
import { useAccountPasswordChangeMutation } from '~~/gql/documents/mutations/account/accountPasswordChange'

const { t } = useI18n()

// refs
const formRef = ref<typeof FormType>()

// api data
const accountPasswordChangeMutation = useAccountPasswordChangeMutation()
const api = getApiData([accountPasswordChangeMutation])

// data
const form = reactive({
  passwordCurrent: ref<string>(),
  passwordNew: ref<string>(),
})
const isFormSent = ref(false)

// methods
const resetForm = () => {
  formRef.value?.resetForm()
}
const submit = async () => {
  if (!(await isFormValid({ v$, isFormSent }))) return

  const result = await accountPasswordChangeMutation.executeMutation({
    passwordCurrent: form.passwordCurrent || '',
    passwordNew: form.passwordNew || '',
  })

  if (result.error || !result.data) return

  await showToast({ title: t('passwordChangeSuccess') })
  resetForm()
}

// vuelidate
const rules = {
  passwordCurrent: VALIDATION_PASSWORD(),
  passwordNew: VALIDATION_PASSWORD(),
}
const v$ = useVuelidate(rules, form)
</script>

<i18n lang="yaml">
de:
  passwordChange: Passwort ändern
  passwordChangeSuccess: Passwort erfolgreich geändert.
  passwordCurrent: Aktuelles Passwort
  passwordNew: Neues Passwort
  postgres22023: Das neue Passwort ist zu kurz! Überlege dir ein längeres.
  postgres28P01: Aktuelles Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
en:
  passwordChange: Change password
  passwordChangeSuccess: Password changed successfully.
  passwordCurrent: Current password
  passwordNew: New password
  postgres22023: Your new password is too short! Think of a longer one.
  postgres28P01: Current password incorrect! Check for spelling mistakes.
</i18n>
