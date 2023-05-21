<template>
  <FormInput
    v-if="formInput"
    :is-optional="isOptional"
    :id-label="`input-${id}`"
    :placeholder="t('globalPlaceholderUrl')"
    :title="t('url')"
    type="url"
    :value="formInput"
    @input="emit('input', $event)"
  >
    <template #stateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="maxLength"
      >
        {{ t('globalValidationLength') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="formatUrlHttps"
      >
        {{ t('globalValidationFormatUrlHttps') }}
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
  input: [event: string]
}>()

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  url: Weblink
en:
  url: Weblink
</i18n>
