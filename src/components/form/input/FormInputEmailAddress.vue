<template>
  <FormInput
    v-if="formInput"
    :is-optional="isOptional"
    :id-label="`input-${id}`"
    :placeholder="t('globalPlaceholderEmailAddress')"
    :title="title || t('emailAddress')"
    type="email"
    :value="formInput"
    @input="emit('input', $event)"
  >
    <template #stateError>
      <FormInputStateError :form-input="formInput" validation-property="email">
        {{ t('globalValidationFormat') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="formatUppercaseNone"
      >
        {{ t('globalValidationFormatUppercaseNone') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="maxLength"
      >
        {{ t('globalValidationLength') }}
      </FormInputStateError>
      <FormInputStateError
        v-if="isRequired"
        :form-input="formInput"
        validation-property="required"
      >
        {{ t('globalValidationRequired') }}
      </FormInputStateError>
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

export interface Props {
  formInput: BaseValidation
  id?: string
  isOptional?: boolean
  isRequired?: boolean
  title?: string
}
withDefaults(defineProps<Props>(), {
  id: 'email-address',
  isOptional: false,
  isRequired: false,
  title: undefined,
})

const emit = defineEmits<{
  input: [event: string]
}>()

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  emailAddress: E-Mail-Adresse
en:
  emailAddress: Email address
</i18n>
