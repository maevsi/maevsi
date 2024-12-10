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
    class="text-gray-500 dark:text-gray-400"
  >
    <IHeroiconsInformationCircleSolid :title="title" />
    <slot />
  </FormInputState>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

export interface Props {
  formInput?: BaseValidation
  isValidationLive?: boolean
  title?: string
  validationProperty?: string
}
withDefaults(defineProps<Props>(), {
  formInput: undefined,
  isValidationLive: false,
  title: undefined,
  validationProperty: undefined,
})
</script>
