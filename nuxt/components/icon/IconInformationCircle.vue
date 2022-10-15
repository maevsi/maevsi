<template>
  <IconContainer :title="title" viewBox="0 0 20 20" fill="currentColor">
    <path
      fill-rule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clip-rule="evenodd"
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
  title: Ungültig
en:
  title: Invalid
</i18n>
