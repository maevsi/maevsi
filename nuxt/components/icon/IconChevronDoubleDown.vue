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
      d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
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
  title: Scroll nach unten
en:
  title: Scroll down
</i18n>
