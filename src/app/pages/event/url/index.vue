<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-lg font-semibold">
        {{ t('addURL') }}
      </h2>
      <input
        v-model="enteredURL"
        type="url"
        class="w-full rounded border p-2 text-black"
        placeholder="Enter an event's link"
      />
      <div class="mt-4 flex items-center justify-between">
        <ShadButton
          variant="secondary"
          class="ml-auto cursor-pointer"
          @click="uploadURL"
        >
          {{ t('process') }}
        </ShadButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const enteredURL = ref<string>('')

const uploadURL = async () => {
  if (!enteredURL.value) return
  try {
    await $fetch('/api/event/ingest/url', {
      method: 'POST',
      body: { url: enteredURL.value },
    })
    console.log('URL uploaded successfully')
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
</script>

<i18n lang="yaml">
de:
  addURL: URL hinzufügen
  process: Verarbeiten
en:
  addURL: Add URL
  process: Process
</i18n>
