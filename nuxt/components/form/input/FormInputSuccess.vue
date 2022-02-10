<template>
  <div
    v-if="formInput && formInput.$model && !formInput.$invalid"
    class="flex gap-1 items-center text-green-600"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'
import { FormInputType } from '~/components/form/input/FormInput.vue'

export default defineComponent({
  props: {
    formInput: {
      required: true,
      type: Object as PropType<FormInputType>,
    },
  },
})
</script>
