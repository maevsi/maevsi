<template>
  <IconContainer
    :title="title"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
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
  title: Menü
en:
  title: Menu
</i18n>
