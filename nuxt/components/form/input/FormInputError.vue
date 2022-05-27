<template>
  <div
    v-if="
      (!formInput && !validationProperty) ||
      (formInput[validation ? '$invalid' : '$error'] &&
        !formInput.$pending &&
        validationProperty in formInput &&
        !formInput[validationProperty])
    "
    class="flex items-center gap-1 text-red-600"
  >
    <IconExclamationCircle v-if="formInput && validationProperty" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    formInput: {
      default: undefined,
      type: Object,
    },
    validation: {
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
