<template>
  <div>
    <input
      :id="`input-${formKey}`"
      class="rounded-sm"
      :disabled="isDisabled"
      type="checkbox"
      :checked="value"
      @change="emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <label class="pl-2" :for="`input-${formKey}`"><slot /></label>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  formKey?: string
  isDisabled?: boolean
  value?: boolean
}
withDefaults(defineProps<Props>(), {
  formKey: undefined,
  isDisabled: undefined,
  value: undefined,
})

const emit = defineEmits<{
  change: [change: boolean]
}>()
</script>
