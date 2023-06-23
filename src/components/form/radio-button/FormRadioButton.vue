<template>
  <div>
    <input
      :id="`input-${groupName}-${titleSlug}`"
      :checked="checked"
      :name="groupName"
      type="radio"
      :value="value || titleSlug"
      @change="emit('change', ($event.target as HTMLInputElement).value)"
    />
    <label class="pl-2" :for="`input-${groupName}-${titleSlug}`">
      {{ title }}
    </label>
  </div>
</template>

<script setup lang="ts">
import slugify from 'slugify'

export interface Props {
  checked?: boolean
  groupName?: string
  title: string
  value: string
}
const props = withDefaults(defineProps<Props>(), {
  checked: false,
  groupName: undefined,
})

const emit = defineEmits<{
  change: [change: string]
}>()

// computations
const titleSlug = computed(() => {
  return slugify(props.title, { lower: true, strict: true })
})
</script>
