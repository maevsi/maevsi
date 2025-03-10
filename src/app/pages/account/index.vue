<template>
  <div class="flex flex-col gap-4">
    <!-- TODO: fill page with content instead (https://github.com/maevsi/vibetype/issues/1264) -->
    <CardStateInfo>
      {{ t('accountDescription') }}
    </CardStateInfo>
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
  accountDescription: Hier wirst du bald interessante Veranstalter entdecken können.
  title: Konten
en:
  accountDescription: Here you will soon be able to discover interesting event organizers.
  title: accounts
</i18n>
