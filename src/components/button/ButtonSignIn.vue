<template>
  <ButtonColored
    :aria-label="t('signIn')"
    :to="
      localePath({
        path: '/session/create',
        query: { to: route.fullPath },
      })
    "
    @click="emit('click')"
  >
    {{ t('signIn') }}
    <template #prefix>
      <IHeroiconsUser />
    </template>
  </ButtonColored>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const emit = defineEmits<{
  click: []
}>()
</script>

<i18n lang="yaml">
de:
  signIn: Anmelden
en:
  signIn: Sign in
</i18n>
