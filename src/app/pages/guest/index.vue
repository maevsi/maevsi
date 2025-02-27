<template>
  <div>
    <LayoutPageTitle :title="title" />
    <CardStateInfo>
      {{ t('soon') }}
    </CardStateInfo>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// data
const title = t('title')
</script>

<i18n lang="yaml">
de:
  soon: Hier wirst du bald sehen können, zu welchen Veranstaltungen du eingeladen bist.
  title: Einladungen
en:
  soon: Here, you will soon be able to see which events you are invited to.
  title: Invitations
</i18n>
