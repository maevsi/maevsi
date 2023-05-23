<template>
  <IconContainer viewBox="0 0 36 36" :title="title || t('title')">
    <path
      fill="#FFCD05"
      d="M0 27c0 2.209 1.791 4 4 4h28c2.209 0 4-1.791 4-4v-4H0v4z"
    />
    <path fill="#ED1F24" d="M0 14h36v9H0z" />
    <path
      fill="#141414"
      d="M32 5H4C1.791 5 0 6.791 0 9v5h36V9c0-2.209-1.791-4-4-4z"
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
  title: Deutsche Flagge
en:
  title: German flag
</i18n>
