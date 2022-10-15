<template>
  <IconContainer
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="paragraph"
    role="img"
    viewBox="0 0 448 512"
    :title="title"
  >
    <path
      fill="currentColor"
      d="M448 63.1C448 81.67 433.7 96 416 96H384v352c0 17.67-14.33 32-31.1 32S320 465.7 320 448V96h-32v352c0 17.67-14.33 32-31.1 32S224 465.7 224 448v-96H198.9c-83.57 0-158.2-61.11-166.1-144.3C23.66 112.3 98.44 32 191.1 32h224C433.7 32 448 46.33 448 63.1z"
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
  title: Paragraf
en:
  title: Paragraph
</i18n>
