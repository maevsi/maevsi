<template>
  <Card>
    <div class="flex items-center gap-4">
      <div class="px-2">
        <IHeroiconsMapPinSolid />
      </div>
      <div class="flex flex-1 items-center gap-2">
        <NotificationIndicator />
        <i18n-t keypath="message" tag="span">
          <template #category>
            <span class="font-bold">
              {{ t('category') }}
            </span>
          </template>
        </i18n-t>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  category: 'Neu:'
  message: '{category} Ortswechsel bei einer Veranstaltung'
en:
  category: 'News:'
  message: '{category} place changed for an event'
</i18n>
