<template>
  <Card>
    <!-- TODO: merge with v1 -->
    <div class="flex items-center gap-4">
      <div class="px-2">
        <IHeroiconsHeart />
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
    </div>
  </Card>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  category: 'Du bist eingeladen:'
  message: '{category} TrapParty 23 von Jonas'
en:
  category: 'You are invited:'
  message: '{category} TrapParty 23 by Jonas'
</i18n>
