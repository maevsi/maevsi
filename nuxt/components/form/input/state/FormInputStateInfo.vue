<template>
  <FormInputState
    v-if="
      (!formInput && !validationProperty) ||
      (formInput[isValidationLive ? '$invalid' : '$error'] &&
        !formInput.$pending &&
        validationProperty &&
        validationProperty in formInput &&
        !formInput[validationProperty])
    "
    class="text-gray-500 dark:text-gray-400"
  >
    <IconInformationCircle />
    <slot />
  </FormInputState>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    formInput: {
      default: undefined,
      type: Object,
    },
    isValidationLive: {
      default: false,
      type: Boolean,
    },
    validationProperty: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
})
</script>
