<template>
  <div>
    <input
      :id="`input-${formKey}`"
      autocomplete="off"
      class="rounded"
      type="checkbox"
      :checked="value"
      @change="onChange"
    />
    <label class="pl-2" :for="`input-${formKey}`"><slot /></label>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  formKey?: string
  value?: boolean
}
withDefaults(defineProps<Props>(), {
  formKey: undefined,
  value: undefined,
})

const emit = defineEmits<{
  (e: 'change', change: boolean): void
}>()

// methods
function onChange(payload: Event) {
  emit('change', (payload.target as HTMLInputElement).checked)
}
</script>
