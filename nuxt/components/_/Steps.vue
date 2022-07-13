<template>
  <div class="m-auto inline-flex gap-4">
    <div
      v-for="(step, index) in steps"
      :key="step"
      class="flex items-center gap-2"
    >
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full border border-background-dark font-bold dark:border-background-bright"
        :class="{
          'bg-background-dark text-text-bright dark:bg-background-bright dark:text-text-dark':
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

<script lang="ts">
import { defineComponent, PropType } from '#app'

export default defineComponent({
  name: 'MaevsiStep',
  props: {
    active: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    steps: {
      required: true,
      type: Array as PropType<Array<string> | undefined>,
    },
  },
})
</script>
