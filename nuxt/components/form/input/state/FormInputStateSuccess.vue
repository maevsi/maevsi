<template>
  <FormInputState
    v-if="formInput && !formInput.$invalid"
    class="text-green-600"
  >
    <IconCheckCircle />
    <slot />
  </FormInputState>
</template>

<script lang="ts">
import { BaseValidation } from '@vuelidate/core' // eslint-disable-line import/named

import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    formInput: {
      required: true,
      type: Object as PropType<BaseValidation | undefined>,
    },
  },
})
</script>
