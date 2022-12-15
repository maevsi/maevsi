<template>
  <IconContainer
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    :title="title || t('title')"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
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
  title: Bearbeiten
en:
  title: Edit
</i18n>
