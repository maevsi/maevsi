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
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
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
  title: Suche
en:
  title: Search
</i18n>
