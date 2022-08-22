<template>
  <FormInputState
    v-if="formInput && formInput.$model && !formInput.$invalid"
    class="text-green-600"
  >
    <IconCheckCircle />
    <slot />
  </FormInputState>
</template>

<script lang="ts">
import { Validation } from '@vuelidate/core'

import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    formInput: {
      required: true,
      type: Object as PropType<Validation | undefined>,
    },
  },
})
</script>
