<template>
  <div>
    <h1>
      {{ t('title') }}
    </h1>
    <div v-if="!selectedFile" class="flex flex-col gap-4">
      <button
        class="rounded-xl border-2 border-dashed border-gray-300 p-12"
        @click="triggerFileInput"
      >
        <div class="flex flex-col items-center gap-4">
          <svg
            class="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M20.4 14.5L16 10 4 20" />
          </svg>
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-medium">{{ t('uploadFiles') }}</h3>
            <p class="text-sm text-gray-500">{{ t('fileTypes') }}</p>
          </div>
        </div>
      </button>
      <ButtonColored
        :aria-label="t('selectFromDevice')"
        class="self-end"
        @click="triggerFileInput"
      >
        {{ t('selectFromDevice') }}
      </ButtonColored>
    </div>
    <div v-else class="flex flex-col gap-4">
      <img class="rounded-md" :src="previewUrl" />
      <div class="flex items-center justify-between">
        <div class="flex gap-4">
          <ButtonColored
            :aria-label="t('replaceImage')"
            :is-primary="false"
            @click="triggerFileInput"
          >
            {{ t('replaceImage') }}
          </ButtonColored>
          <ButtonColored
            :aria-label="t('clearAll')"
            :is-primary="false"
            @click="removeFile"
          >
            {{ t('clearAll') }}
          </ButtonColored>
        </div>
        <ButtonColored :aria-label="t('uploadImage')" @click="uploadFile">
          {{ t('uploadImage') }}
        </ButtonColored>
      </div>
    </div>
    <input
      ref="fileInputRef"
      accept="image/png,image/jpeg,image/gif"
      class="hidden"
      type="file"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const store = useStore()
const fireAlert = useFireAlert()

// refs
const fileInputRef = ref<HTMLInputElement>()

// data
const previewUrl = ref<string>()
const selectedFile = ref<File>()

// methods
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  if (!file) return

  if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
    alert('Invalid file type or size')
    return
  }

  // avoid memory leaks
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}
const removeFile = () => {
  selectedFile.value = undefined

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}
const triggerFileInput = () => {
  if (!fileInputRef.value) return

  fileInputRef.value.value = ''
  fileInputRef.value.click()
}
const uploadFile = async () => {
  if (!selectedFile.value) return

  const reader = new FileReader()
  reader.readAsDataURL(selectedFile.value)
  reader.onload = async () => {
    const base64Image = (reader.result as string).split(',')[1]

    try {
      await $fetch('/api/event/ingest/image', {
        body: { base64Image },
        headers: {
          Authorization: `Bearer ${store.jwt}`,
        },
        method: 'POST',
      })
      console.log('Upload success')
    } catch (error) {
      console.error('Upload failed:', error)
      await fireAlert({
        error,
        level: 'error',
        text: t('uploadFailed'),
        title: t('error'),
      })
    }
  }
  reader.onerror = () => {
    console.error('Error reading file')
  }
}
</script>

<i18n lang="yaml">
de:
  clearAll: Löschen
  fileTypes: PNG, JPG, GIF bis zu 10 MB
  error: Fehler
  replaceImage: Bild ersetzen
  selectFromDevice: Vom Gerät auswählen
  title: Bild laden
  uploadFailed: Hochladen fehlgeschlagen
  uploadFiles: Datei hochladen
  uploadImage: Bild hochladen
en:
  clearAll: Clear
  fileTypes: PNG, JPG, GIF up to 10 MB
  error: Error
  replaceImage: Replace image
  selectFromDevice: Select from device
  title: Ingest image
  uploadFailed: Upload failed
  uploadFiles: Upload file
  uploadImage: Upload image
</i18n>
