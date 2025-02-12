<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <div v-if="!selectedFile" class="space-y-4">
        <h2 class="text-lg font-semibold">
          {{ t('addImages') }}
        </h2>
        <div
          class="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-12"
          @click="triggerFileInput"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <div class="mb-4">
              <svg
                class="h-12 w-12 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M20.4 14.5L16 10 4 20" />
              </svg>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-medium">{{ t('uploadFiles') }}</h3>
              <p class="text-sm text-gray-500">{{ t('fileTypes') }}</p>
            </div>
          </div>
        </div>
        <div class="flex w-full">
          <ShadButton
            variant="secondary"
            class="ml-auto cursor-pointer"
            @click="triggerFileInput"
          >
            {{ t('selectFromDevice') }}
          </ShadButton>
        </div>
      </div>

      <div v-else>
        <div class="w-full">
          <div
            class="relative w-full overflow-hidden rounded-md border border-[#27114F]"
          >
            <img :src="previewUrl" class="w-full object-cover" />
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <button
            class="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            @click="removeFile"
          >
            <span>{{ t('clearAll') }}</span>
          </button>
          <ShadButton
            variant="secondary"
            class="ml-auto cursor-pointer"
            @click="triggerFileInput"
          >
            {{ t('replaceImage') }}
          </ShadButton>
        </div>
        <div class="mt-4">
          <ShadButton
            variant="primary"
            class="w-full"
            :disabled="!selectedFile"
            @click="uploadFile"
          >
            {{ t('uploadImage') }}
          </ShadButton>
        </div>
      </div>
    </div>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/png,image/jpeg,image/gif"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ modelValue?: File }>()
const emit = defineEmits<{ 'update:modelValue': [file: File | null] }>()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(props.modelValue || null)
const previewUrl = ref<string | null>(
  selectedFile.value ? URL.createObjectURL(selectedFile.value) : null,
)

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.value = ''
    fileInput.value.click()
  }
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]

  if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
    alert('Invalid file type or size')
    return
  }

  if (selectedFile.value) {
    URL.revokeObjectURL(previewUrl.value!)
  }

  if (file) {
    selectedFile.value = file
  }
  previewUrl.value = URL.createObjectURL(file)
  emitUpdate()
}

const removeFile = () => {
  if (selectedFile.value) {
    URL.revokeObjectURL(previewUrl.value!)
    selectedFile.value = null
    previewUrl.value = null
    if (fileInput.value) fileInput.value.value = ''
    emitUpdate()
  }
}

const uploadFile = async () => {
  if (!selectedFile.value) return

  const reader = new FileReader()
  reader.readAsDataURL(selectedFile.value)

  reader.onload = async () => {
    // Extract only the base64 data part (remove data URL prefix)
    const base64String = (reader.result as string).split(',')[1] // <-- This is the key fix

    try {
      const response = await $fetch('/api/event/ingest/image', {
        method: 'POST',
        body: { base64Image: base64String }, // Make sure property name matches
      })
      console.log('Upload success:', response)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  // Add error handling
  reader.onerror = () => {
    console.error('Error reading file')
    // Show user error notification
  }
}

const emitUpdate = () => {
  emit('update:modelValue', selectedFile.value)
}
</script>

<i18n lang="yaml">
de:
  addImages: Bild hinzufügen
  uploadFiles: Datei hochladen
  fileTypes: PNG, JPG, GIF bis zu 10 MB
  selectFromDevice: Vom Gerät auswählen
  clearAll: Löschen
  replaceImage: Bild ersetzen
  uploadImage: Bild hochladen

en:
  addImages: Add image
  uploadFiles: Upload file
  fileTypes: PNG, JPG, GIF up to 10 MB
  selectFromDevice: Select from device
  clearAll: Clear
  replaceImage: Replace image
  uploadImage: Upload image
</i18n>
