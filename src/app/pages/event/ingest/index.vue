<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-lg font-semibold">
        {{ t('addImages') }}
      </h2>

      <div v-if="!selectedFiles.length" class="space-y-4">
        <div
          class="rounded-xl border-2 border-dashed border-gray-300 p-12"
          style="cursor: pointer"
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
            class="ml-auto"
            style="cursor: pointer"
            @click="triggerFileInput"
          >
            {{ t('selectFromDevice') }}
          </ShadButton>
        </div>
      </div>

      <!-- Files Preview State -->
      <div v-else>
        <div class="grid grid-cols-3 gap-2 sm:gap-4">
          <div
            v-for="(file, index) in selectedFiles"
            :key="index"
            class="relative"
          >
            <div
              class="bg-background-surface rounded-lg p-2 pb-4 sm:p-4 sm:pb-6 md:rounded-2xl"
            >
              <div
                class="relative aspect-[4/3] w-full overflow-hidden rounded-md border"
                :class="[
                  selectedCover === index
                    ? 'border-accent-strong border-4'
                    : 'border border-[#27114F]',
                ]"
              >
                <img
                  :src="previewUrls[index]"
                  class="h-full w-full object-cover"
                />
              </div>

              <div
                class="mt-1 flex items-center justify-between px-1 sm:mt-2 sm:px-2"
              >
                <div
                  class="flex h-6 w-6 items-center justify-center border bg-white sm:h-8 sm:w-8"
                >
                  <input
                    v-model="selectedCover"
                    type="radio"
                    :name="'cover'"
                    :value="index"
                    class="h-3.5 w-3.5 rounded-full border text-[#00A24C] focus:ring-0 sm:h-5 sm:w-5"
                  />
                </div>

                <div>
                  <button class="p-1 sm:p-1.5" @click="removeFile(index)">
                    <X class="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/png,image/jpeg,image/gif"
        multiple
        @change="handleFileSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { X } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    modelValue: () => []
    maxFiles?: number
    multiple?: boolean
    allowedFileTypes?: string[]
    maxSizeMB?: number
  }>(),
  {
    maxFiles: 6,
    multiple: true,
    allowedFileTypes: () => ['image/png', 'image/jpeg', 'image/gif'],
    maxSizeMB: 10,
  },
)

const emit = defineEmits<{
  'update:modelValue': [files: File[]]
  'update:cover': [index: number]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<File[]>(props.modelValue || [])
const previewUrls = ref<string[]>([])
const selectedCover = ref(0)

watchEffect(() => {
  previewUrls.value = selectedFiles.value.map((file) =>
    URL.createObjectURL(file),
  )
})

// File input trigger
const triggerFileInput = () => {
  if (selectedFiles.value.length >= props.maxFiles) return
  fileInput.value?.click()
}

// Handle file selection
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const newFiles = Array.from(input.files)
    .filter(
      (file) =>
        props.allowedFileTypes.includes(file.type) &&
        file.size <= props.maxSizeMB * 1024 * 1024,
    )
    .slice(0, props.maxFiles - selectedFiles.value.length)

  selectedFiles.value = [...selectedFiles.value, ...newFiles]
  input.value = '' // Reset input
  emitUpdate()
}

// Remove single file
const removeFile = (index: number) => {
  URL.revokeObjectURL(previewUrls.value[index])
  selectedFiles.value.splice(index, 1)
  if (selectedCover.value === index) selectedCover.value = 0
  emitUpdate()
}

// Emit updates
const emitUpdate = () => {
  emit('update:modelValue', selectedFiles.value)
  emit('update:cover', selectedCover.value)
}
</script>

<i18n lang="yaml">
de:
  addImages: Bilder hinzufügen
  uploadFiles: Dateien hochladen
  fileTypes: PNG, JPG, GIF bis zu 10 MB
  selectFromDevice: Vom Gerät auswählen

en:
  addImages: Add images
  uploadFiles: Upload files
  fileTypes: PNG, JPG, GIF up to 10 MB
  selectFromDevice: Select from device
</i18n>
