<template>
  <IconContainer
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    :title="title || t('title')"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </IconContainer>
</template>

<script setup lang="ts">
export interface Props {
  title?: string // eslint-disable-line vue/require-default-prop
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  title: Vor
en:
  title: Forward
</i18n>
