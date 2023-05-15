<template>
  <FormInputState
    v-if="
      (!formInput && !validationProperty) ||
      (formInput &&
        formInput[isValidationLive ? '$invalid' : '$error'] &&
        !formInput.$pending &&
        validationProperty &&
        validationProperty in formInput &&
        formInput[validationProperty].$invalid)
    "
    class="text-red-600"
  >
    <IconExclamationCircle v-if="formInput && validationProperty" />
    <slot />
  </FormInputState>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

export interface Props {
  formInput?: BaseValidation
  isValidationLive?: boolean
  validationProperty?: string
}
withDefaults(defineProps<Props>(), {
  formInput: undefined,
  isValidationLive: false,
  validationProperty: undefined,
})
</script>
