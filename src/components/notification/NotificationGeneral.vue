<template>
  <Card>
    <div class="flex items-center gap-4">
      <div class="px-2">
        <IHeroiconsCalendar />
      </div>
      <div class="flex flex-1 flex-col">
        <i18n-t keypath="message" tag="span">
          <template #category>
            <span class="font-bold">
              {{ t('category') }}
            </span>
          </template>
        </i18n-t>
      </div>
      <div class="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
    </div>
  </Card>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  category: 'Neu:'
  message: '{category} Datumsänderung einer Veranstaltung'
en:
  category: 'News:'
  message: '{category} date changed for an event'
</i18n>
