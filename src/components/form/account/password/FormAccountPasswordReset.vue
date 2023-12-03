<template>
  <Form
    :errors="api.errors"
    :errors-pg-ids="{
      postgres22023: t('postgres22023'),
      postgresP0002: t('postgresP0002'),
      postgres55000: t('postgres55000'),
    }"
    :form="v$"
    :form-class="formClass"
    :is-form-sent="isFormSent"
    :submit-name="t('accountPasswordReset')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      :form-input="v$.password"
      :title="t('passwordNew')"
      @input="form.password = $event"
    />
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useAccountPasswordResetMutation } from '~/gql/documents/mutations/account/accountPasswordReset'

export interface Props {
  formClass?: string
}
withDefaults(defineProps<Props>(), {
  formClass: undefined,
})

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

// api data
const passwordResetMutation = useAccountPasswordResetMutation()
const api = getApiData([passwordResetMutation])

// data
const form = reactive({
  password: ref<string>(),
})
const isFormSent = ref(false)

// methods
const submit = async () => {
  if (!(await isFormValid({ v$, isFormSent }))) return

  const result = await passwordResetMutation.executeMutation({
    code: route.query.code,
    password: form.password || '',
  })

  if (result.error || !result.data) return

  showToast({ title: t('accountPasswordResetSuccess') })
  await navigateTo(localePath(`/session/create`))
}

// vuelidate
const rules = {
  password: VALIDATION_PASSWORD(),
}
const v$ = useVuelidate(rules, form)
</script>

<i18n lang="yaml">
de:
  accountPasswordReset: Passwort zurücksetzen
  accountPasswordResetSuccess: Passwort erfolgreich zurückgesetzt.
  passwordNew: Neues Passwort
  postgres22023: Das Passwort ist zu kurz! Überlege dir ein längeres.
  postgresP0002: Unbekannter Zurücksetzungslink! Hast du dein Passwort vielleicht schon zurückgesetzt?
  postgres55000: Der Zurücksetzungslink ist abgelaufen!
en:
  accountPasswordReset: Reset password
  accountPasswordResetSuccess: Password reset successfully.
  passwordNew: New Password
  postgres22023: This password is too short! Think of a longer one.
  postgresP0002: Invalid reset link! Have you perhaps already reset your password?
  postgres55000: Your reset link has expired!
</i18n>
