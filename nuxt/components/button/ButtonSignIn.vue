<template>
  <ButtonColored
    :aria-label="t('signIn')"
    :to="localePath({ path: '/task/account/sign-in' })"
    @click="emit('click')"
  >
    {{ t('signIn') }}
    <template #prefix>
      <IconUser />
    </template>
  </ButtonColored>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<i18n lang="yml">
de:
  signIn: Anmelden
en:
  signIn: Sign in
</i18n>
