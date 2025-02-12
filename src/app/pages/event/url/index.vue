<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-lg font-semibold">
        {{ t('addURL') }}
      </h2>
      <input
        v-model="enteredURL"
        type="url"
        class="text-text-dark w-full rounded border p-2"
        :placeholder="t('enterEventLink')"
      />
      <div class="mt-4 flex items-center justify-between">
        <ShadButton
          variant="secondary"
          class="cursor-pointer"
          @click="uploadURL"
        >
          {{ t('process') }}
        </ShadButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const enteredURL = ref<string>()

const uploadURL = async () => {
  if (!enteredURL.value) return
  try {
    await $fetch('/api/event/ingest/url', {
      method: 'POST',
      body: { url: enteredURL.value },
    })
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
</script>

<i18n lang="yaml">
de:
  addURL: URL hinzufügen
  process: Verarbeiten
  enterEventLink: Veranstaltungslink eingeben
en:
  addURL: Add URL
  process: Process
  enterEventLink: Enter event link
</i18n>
