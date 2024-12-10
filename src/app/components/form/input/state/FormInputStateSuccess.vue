<template>
  <FormInputState
    v-if="formInput && !formInput.$invalid"
    class="text-green-600"
  >
    <IHeroiconsCheckCircleSolid />
    <slot />
  </FormInputState>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

export interface Props {
  formInput: BaseValidation
}
withDefaults(defineProps<Props>(), {})
</script>
