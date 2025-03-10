<template>
  <div class="m-auto inline-flex gap-4">
    <div
      v-for="(step, index) in steps"
      :key="step"
      class="flex items-center gap-2"
    >
      <div
        class="border-background-darken dark:border-background-brighten flex h-8 w-8 items-center justify-center rounded-full border font-bold"
        :class="{
          'bg-background-darken text-text-bright dark:bg-background-brighten dark:text-text-dark':
            step === active,
        }"
      >
        {{ index + 1 }}
      </div>
      <span>
        {{ step }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  active?: string
  steps?: Array<string>
}
withDefaults(defineProps<Props>(), {
  active: undefined,
  steps: undefined,
})
</script>

<script lang="ts">
export default {
  name: 'AppStep',
}
</script>
