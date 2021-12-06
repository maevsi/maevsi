<template>
  <div
    v-if="formInput && formInput.$model && !formInput.$invalid"
    class="text-green-600 text-left"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { FormInputType } from '~/components/form/input/FormInput.vue'

import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    formInput: {
      required: true,
      type: Object as PropType<FormInputType>,
    },
  },
})
</script>
