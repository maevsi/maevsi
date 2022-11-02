<template>
  <FormInput
    v-if="formInput"
    :is-optional="isOptional"
    :id-label="`input-${id}`"
    :placeholder="t('globalPlaceholderPhoneNumber')"
    :title="t('phoneNumber')"
    type="tel"
    :value="formInput"
    @input="emit('input', $event)"
  >
    <template #stateInfo>
      <FormInputStateInfo
        :form-input="formInput"
        validation-property="formatPhoneNumber"
      >
        {{ t('validationFormat') }}
      </FormInputStateInfo>
    </template>
    <template #stateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="formatPhoneNumber"
      >
        {{ t('globalValidationFormat') }}
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
}
withDefaults(defineProps<Props>(), {
  id: 'phone-number',
  isOptional: false,
})

const emit = defineEmits<{
  (e: 'input', event: string): void
}>()

const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  phoneNumber: Telefonnummer
  validationFormat: Muss mit einem Plus beginnen und darf sonst nur Ziffern enthalten (z.B. +1234567890)
en:
  phoneNumber: Phone number
  validationFormat: Must start with a plus and may otherwise only contain digits (e.g. +1234567890)
</i18n>
