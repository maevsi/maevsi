<template>
  <UBreadcrumb :links="items">
    <template #icon="{ link }">
      <IHeroiconsHome v-if="link.to === localePath('/')" />
    </template>
  </UBreadcrumb>
</template>

<script setup lang="ts">
export interface Props {
  items: any // TODO: use `BreadcrumbLink` (https://github.com/nuxt/ui/issues/1169)
}
withDefaults(defineProps<Props>(), {})

const localePath = useLocalePath()
</script>
