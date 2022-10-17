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
      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
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

<i18n lang="yml">
de:
  title: Einloggen
en:
  title: Login
</i18n>
