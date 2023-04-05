<template>
  <Form
    :errors="api.errors"
    :errors-pg-ids="{
      postgres55000: t('postgres55000'),
      postgresP0002: t('postgresP0002'),
    }"
    :form="v$"
    :form-class="formClass"
    :is-form-sent="isFormSent"
    :submit-name="t('accountPasswordResetRequest')"
    @submit.prevent="submit"
  >
    <FormInputEmailAddress
      :form-input="v$.emailAddress"
      is-required
      :title="t('emailAddressYours')"
      @input="form.emailAddress = $event"
    />
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email, maxLength, required } from '@vuelidate/validators'
import { useAccountPasswordResetRequestMutation } from '~/gql/documents/mutations/account/accountPasswordResetRequest'

export interface Props {
  formClass?: string
}
withDefaults(defineProps<Props>(), {
  formClass: undefined,
})

const emit = defineEmits<{
  (e: 'account-password-reset-request'): void
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
async function submit() {
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
  emailAddress: {
    email,
    formatUppercaseNone: VALIDATION_FORMAT_UPPERCASE_NONE,
    maxLength: maxLength(VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM),
    required,
  },
}
const v$ = useVuelidate(rules, form)
</script>

<i18n lang="yaml">
de:
  accountPasswordResetRequest: E-Mail senden
  accountPasswordResetRequestSuccess: Vergib ein neues Password über den Link, den du in der E-Mail findest, die du in Kürze erhalten wirst.
  emailAddressYours: Deine E-Mail-Adresse
  postgres55000: Die E-Mail-Adresse ist noch nicht verifiziert!
  postgresP0002: Es gibt keinen Account mit dieser E-Mail-Adresse! Überprüfe deine Eingaben auf Schreibfehler.
en:
  accountPasswordResetRequest: Send email
  accountPasswordResetRequestSuccess: Choose a new password using the verification link sent to you by email.
  emailAddressYours: Your email address
  postgres55000: This email address has not been verified yet!
  postgresP0002: There is no account with this email address! Check your input for spelling mistakes.
</i18n>
