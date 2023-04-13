<template>
  <MenuItem>
    <template #default="{ active }">
      <div class="relative flex">
        <Button
          :aria-label="ariaLabel"
          :class="[
            'p-2 rounded w-full',
            active ? 'bg-gray-800 text-white' : '',
          ]"
          :disabled.prop="isLoading"
        >
          {{ ariaLabel }}
          <template #prefix>
            <slot />
          </template>
        </Button>
        <LoaderIndicatorSpinner v-if="isLoading" class="absolute inset-0" />
      </div>
    </template>
  </MenuItem>
</template>

<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'

export interface Props {
  ariaLabel: string
  isLoading?: boolean
}
withDefaults(defineProps<Props>(), {
  isLoading: false,
})
</script>
