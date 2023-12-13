<template>
  <RadioGroup
    :model-value="model"
    @update:model-value="(value) => emit('change', value)"
  >
    <div
      class="relative -space-y-px rounded-md bg-background-brighten dark:bg-background-darken"
    >
      <RadioGroupOption
        v-for="(option, optionId) in options"
        v-slot="{ checked, active }"
        :key="option.id"
        as="template"
        :value="option.id"
      >
        <div
          :class="[
            optionId === 0 ? 'rounded-tl-md rounded-tr-md' : '',
            optionId === options.length - 1
              ? 'rounded-bl-md rounded-br-md'
              : '',
            checked
              ? 'z-10 border-indigo-200 bg-indigo-50 dark:border-zinc-950 dark:bg-zinc-900'
              : 'border-gray-200 dark:border-gray-800',
            'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6',
          ]"
        >
          <span class="flex items-center">
            <span
              :class="[
                checked
                  ? 'border-transparent bg-indigo-600'
                  : 'border-gray-300 bg-white',
                active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                'flex h-4 w-4 items-center justify-center rounded-full border',
              ]"
              aria-hidden="true"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <RadioGroupLabel
              as="span"
              :class="[
                checked ? 'text-indigo-900 dark:text-indigo-100' : '',
                'ml-3 flex items-center gap-2 font-medium',
              ]"
            >
              {{ option.name }}
            </RadioGroupLabel>
          </span>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

export interface Props {
  model?: any
  options: any[]
}
withDefaults(defineProps<Props>(), {
  model: undefined,
})

const emit = defineEmits<{
  change: [value: any]
}>()
</script>
