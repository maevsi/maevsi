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
import consola from 'consola'
import Swal from 'sweetalert2'

import {
  formPreSubmit,
  VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM,
  VALIDATION_FORMAT_UPPERCASE_NONE,
} from '~/utils/validation'
import { useAccountPasswordResetRequestMutation } from '~/gql/generated'

export interface Props {
  formClass?: string
}
withDefaults(defineProps<Props>(), {
  formClass: undefined,
})

const emit = defineEmits<{
  (e: 'account-password-reset-request'): void
}>()

const { locale, t } = useI18n()
const passwordResetRequestMutation = useAccountPasswordResetRequestMutation()

// api data
const api = computed(() =>
  reactive({
    data: {
      ...passwordResetRequestMutation.data.value,
    },
    ...getApiMeta([passwordResetRequestMutation]),
  })
)

// data
const form = reactive({
  emailAddress: ref<string>(),
})
const isFormSent = ref(false)

// methods
async function submit() {
  try {
    await formPreSubmit(api, v$, isFormSent)
  } catch (error) {
    consola.error(error)
    return
  }

  const result = await passwordResetRequestMutation.executeMutation({
    emailAddress: form.emailAddress || '',
    language: locale.value,
  })

  if (result.error) {
    api.value.errors.push(result.error)
    consola.error(result.error)
  }

  if (!result.data) {
    return
  }

  emit('account-password-reset-request')
  Swal.fire({
    icon: 'success',
    text: t('accountPasswordResetRequestSuccess') as string,
    title: t('requestAccepted'),
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
  requestAccepted: Anfrage angenommen!
en:
  accountPasswordResetRequest: Send email
  accountPasswordResetRequestSuccess: Choose a new password using the verification link sent to you by email.
  emailAddressYours: Your email address
  postgres55000: This email address has not been verified yet!
  postgresP0002: There is no account with this email address! Check your input for spelling mistakes.
  requestAccepted: Request accepted!
</i18n>
