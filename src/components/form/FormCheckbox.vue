<template>
  <div>
    <input
      :id="`input-${formKey}`"
      ref="checkbox"
      type="checkbox"
      @change.prevent="emit('change')"
    />
    <label class="pl-2" :for="`input-${formKey}`">
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  formKey: string
  isChecked?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isChecked: false,
})

const emit = defineEmits<{
  change: []
}>()

// data
const checkbox = ref<HTMLInputElement>()

// methods
const setIsChecked = (isChecked: boolean) =>
  (checkbox.value.checked = isChecked)

watch(
  () => props.isChecked,
  (currentValue) => setIsChecked(currentValue),
)
onMounted(() => setIsChecked(props.isChecked))
</script>
