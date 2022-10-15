<template>
  <IconContainer
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    :title="title"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
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
  title: Zurück
en:
  title: Back
</i18n>
