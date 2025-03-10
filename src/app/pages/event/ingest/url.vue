<template>
  <div class="flex flex-col gap-4">
    <h1>
      {{ t('title') }}
    </h1>
    <div>
      <label for="url-input">
        {{ t('addURL') }}
      </label>
      <input
        id="url-input"
        v-model="enteredURL"
        type="url"
        class="text-text-dark w-full rounded"
        :placeholder="t('enterEventLink')"
      />
    </div>
    <ButtonColored
      :aria-label="t('process')"
      class="self-end"
      @click="uploadURL"
    >
      {{ t('process') }}
    </ButtonColored>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  validate: () => import.meta.dev,
})

const { t } = useI18n()
const store = useStore()

const enteredURL = ref<string>()

const uploadURL = async () => {
  if (!enteredURL.value || !store.jwt) return

  try {
    await $fetch('/api/event/ingest/url', {
      body: { url: enteredURL.value },
      headers: {
        Authorization: `Bearer ${store.jwt}`,
      },
      method: 'POST',
    })
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
</script>

<i18n lang="yaml">
de:
  addURL: URL hinzufügen
  enterEventLink: Veranstaltungslink eingeben
  process: Verarbeiten
  title: Link laden
en:
  addURL: Add URL
  enterEventLink: Enter event link
  process: Process
  title: Ingest URL
</i18n>
