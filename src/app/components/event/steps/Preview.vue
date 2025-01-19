<template>
  <div>
    <div class="relative mx-auto w-full max-w-md">
      <div class="flex h-72 items-center justify-center bg-gray-200">
        <Image class="h-16 w-16 text-gray-400"></Image>
      </div>

      <div class="absolute right-4 top-4 flex space-x-3">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
          :aria-label="t('share')"
        >
          <Share class="h-6 w-6 text-gray-700"></Share>
        </button>
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
          :aria-label="t('favorite')"
        >
          <Heart class="h-6 w-6 text-red-500"></Heart>
        </button>
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
          :aria-label="t('options')"
        >
          <Ellipsis class="h-6 w-6 text-gray-700"></Ellipsis>
        </button>
      </div>
    </div>

    <div class="mt-4 flex">
      <div
        class="mr-4 flex flex-col items-center justify-center text-center font-bold text-blue-600"
      >
        <span class="text-sm">{{
          formatDate(form.startDate, { weekday: 'short' })
        }}</span>
        <span class="text-3xl">{{
          formatDate(form.startDate, { day: 'numeric' })
        }}</span>
        <span class="text-sm">{{
          formatDate(form.startDate, { month: 'short' })
        }}</span>
        <span class="mt-2 text-base font-semibold text-blue-500">{{
          form.startTime
        }}</span>
      </div>

      <div class="mx-4 h-auto w-px self-stretch bg-black"></div>

      <div
        class="max-w-md break-words font-semibold leading-tight text-gray-900"
      >
        <h3>{{ form.name }}</h3>
      </div>
    </div>

    <div class="mt-4">
      <h2 class="mb-3 text-2xl">{{ t('description') }}</h2>
      <div>
        <p class="whitespace-pre-wrap leading-relaxed text-gray-700">
          {{ form.description }}
        </p>
      </div>
    </div>

    <div class="mt-4">
      <h2 class="mb-3 text-2xl">{{ t('highlights') }}</h2>
      <div class="mb-4 grid h-72 grid-cols-4 gap-1">
        <div class="col-span-3 flex items-center justify-center bg-gray-200">
          <Image class="h-16 w-16 text-gray-400" />
        </div>

        <div class="grid grid-rows-2 gap-1">
          <div class="flex items-center justify-center bg-gray-200">
            <Image class="h-16 w-16 text-gray-400" />
          </div>
          <div class="flex items-center justify-center bg-gray-200">
            <Image class="h-16 w-16 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ellipsis, Heart, Share, Image } from 'lucide-vue-next'
const { t } = useI18n()

defineProps({
  form: {
    type: Object,
    required: true,
  },
  validation: {
    type: Object,
    required: true,
  },
})

const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions,
) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('de', options).format(date)
}
</script>
<i18n lang="yaml">
de:
  description: Beschreibung
  highlights: Highlights
  share: Teilen
  favorite: Favorit
  options: Optionen
en:
  description: Description
  highlights: Highlights
  share: Share
  favorite: Favorite
  options: Options
</i18n>
