<template>
  <div>
    <LayoutPageTitle />
    <div class="mt-10 flex flex-col items-center">
      <h1 class="text-center">
        {{ t('title') }}
      </h1>
      <div class="flex justify-center">
        <FormAccountPasswordResetRequest />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

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
