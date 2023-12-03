<template>
  <div class="flex flex-col items-center gap-2">
    <span>{{ callToActionDescription }}</span>
    <ButtonColored
      :aria-label="callToAction"
      :to="
        localePath({
          path: '/session/create',
          query: {
            to: route.fullPath,
          },
        })
      "
    >
      {{ callToAction }}
    </ButtonColored>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  callToAction: string
  callToActionDescription: string
}
withDefaults(defineProps<Props>(), {})

const localePath = useLocalePath()
const route = useRoute()
</script>
