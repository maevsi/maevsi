<template>
  <IconContainer
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="italic"
    role="img"
    viewBox="0 0 384 512"
    :title="title || t('title')"
  >
    <path
      fill="currentColor"
      d="M384 64.01c0 17.69-14.31 32-32 32h-58.67l-133.3 320H224c17.69 0 32 14.31 32 32s-14.31 32-32 32H32c-17.69 0-32-14.31-32-32s14.31-32 32-32h58.67l133.3-320H160c-17.69 0-32-14.31-32-32s14.31-32 32-32h192C369.7 32.01 384 46.33 384 64.01z"
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
  title: Kursiv
en:
  title: Italic
</i18n>
