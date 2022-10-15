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
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </IconContainer>
</template>

<script setup lang="ts">
export interface Props {
  title?: string
}
withDefaults(defineProps<Props>(), {
  title: t('title'), // eslint-disable-line no-use-before-define
})
</script>

<script lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  title: Herunterladen
en:
  title: Download
</i18n>
