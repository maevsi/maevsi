<template>
  <FormInputState
    v-if="
      (!formInput && !validationProperty) ||
      (formInput &&
        formInput[isValidationLive ? '$invalid' : '$error'] &&
        !formInput.$pending &&
        validationProperty &&
        validationProperty in formInput &&
        !formInput[validationProperty].$invalid)
    "
    class="text-red-600"
  >
    <IconExclamationCircle v-if="formInput && validationProperty" />
    <slot />
  </FormInputState>
</template>

<script lang="ts">
import { PropType } from 'vue'

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
