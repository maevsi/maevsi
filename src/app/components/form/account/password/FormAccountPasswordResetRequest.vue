<template>
  <Form
    :errors="api.errors"
    :form="v$"
    :form-class="formClass"
    :is-form-sent="isFormSent"
    :submit-name="t('accountPasswordResetRequest')"
    @submit.prevent="submit"
  >
    <FormInputEmailAddress
      :form-input="v$.emailAddress"
      :title="t('emailAddressYours')"
      @input="form.emailAddress = $event"
    />
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useAccountPasswordResetRequestMutation } from '~~/gql/documents/mutations/account/accountPasswordResetRequest'

export interface Props {
  formClass?: string
}
withDefaults(defineProps<Props>(), {
  formClass: undefined,
})

const emit = defineEmits<{
  'account-password-reset-request': []
}>()

const fireAlert = useFireAlert()
const { locale, t } = useI18n()

// api data
const passwordResetRequestMutation = useAccountPasswordResetRequestMutation()
const api = getApiData([passwordResetRequestMutation])

// data
const form = reactive({
  emailAddress: ref<string>(),
})
const isFormSent = ref(false)

// methods
const submit = async () => {
  if (!(await isFormValid({ v$, isFormSent }))) return

  const result = await passwordResetRequestMutation.executeMutation({
    emailAddress: form.emailAddress || '',
    language: locale.value,
  })

  if (result.error || !result.data) return

  emit('account-password-reset-request')
  await fireAlert({
    level: 'success',
    text: t('accountPasswordResetRequestSuccess'),
  })
}

// vuelidate
const rules = {
  emailAddress: VALIDATION_EMAIL_ADDRESS({ isRequired: true }),
}
const v$ = useVuelidate(rules, form)
</script>

<i18n lang="yaml">
de:
  accountPasswordResetRequest: E-Mail senden
  accountPasswordResetRequestSuccess: Wenn es ein Konto zu der eingegebenen E-Mail-Adresse gibt, erhältst du in Kürze eine E-Mail. Über den Link in dieser E-Mail kannst du ein neues Password vergeben.
  emailAddressYours: Deine E-Mail-Adresse
en:
  accountPasswordResetRequest: Send email
  accountPasswordResetRequestSuccess: If there is an account for the given email address, you will receive an email shortly. You can use the link in that email to set a new password.
  emailAddressYours: Your email address
</i18n>
