<template>
  <IconContainer
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    :title="title"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </IconContainer>
</template>

<script setup lang="ts">
export interface Props {
  title?: string
}

const { t } = useI18n()

withDefaults(defineProps<Props>(), {
  title: t('title'),
})
</script>

<i18n lang="yml">
de:
  title: Schließen
en:
  title: Close
</i18n>
