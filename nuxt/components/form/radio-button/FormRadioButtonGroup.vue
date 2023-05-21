<template>
  <div>
    <FormRadioButton
      v-for="titlesValue in titlesValues"
      :key="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :checked="
        (Array.isArray(titlesValue) ? titlesValue[1] : titlesValue) ===
        modelValue
      "
      :group-name="name"
      :title="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :value="Array.isArray(titlesValue) ? titlesValue[1] : titlesValue"
      @change="emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  name?: string
  titlesValues: string[] | string[][]
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
