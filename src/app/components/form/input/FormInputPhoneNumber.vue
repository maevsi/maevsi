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
      <!-- TODO: use `libphonenumber-js` (https://github.com/maevsi/vibetype/issues/1384) -->
      <FormInputStateInfo
        v-if="
          formInput.$dirty &&
          !REGEX_PHONE_NUMBER.test(formInput.$model as string)
        "
      >
        {{ t('validationFormat') }}
      </FormInputStateInfo>
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
  input: [event: string]
}>()

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  phoneNumber: Telefonnummer
  validationFormat: Sollte mit einem Plus beginnen, wonach nur Ziffern folgen (z.B. +1234567890)
en:
  phoneNumber: Phone number
  validationFormat: Should start with a plus followed only by digits (e.g. +1234567890)
</i18n>
