<template>
  <div>
    <LayoutPageTitle
      :title="title"
      :centered="true"
      :to="localePath('/session/create')"
    />
    <div class="mt-5 flex justify-center">
      <FormAccountPasswordResetRequest />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// data
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  title: Passwort zurücksetzen
en:
  title: Reset password
</i18n>
