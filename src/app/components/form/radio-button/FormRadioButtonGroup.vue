<template>
  <div>
    <FormRadioButton
      v-for="option in options"
      :key="option.value"
      :checked="option.value === modelValue"
      :group-name="name"
      :title="option.title"
      :value="option.value"
      @change="emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  name?: string
  options: {
    title: string
    value: string
  }[]
  modelValue?: string
}
withDefaults(defineProps<Props>(), {
  name: undefined,
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [change: string]
}>()
</script>
