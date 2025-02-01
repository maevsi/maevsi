<template>
  <div class="-mx-4 sm:-mx-6 md:-mx-8">
    <div class="relative w-full">
      <template v-if="props.form.previewUrls.length > 0">
        <Carousel
          v-model="currentSlide"
          class="w-full"
          @select="handleSlideChange"
        >
          <CarouselContent>
            <CarouselItem
              v-for="(url, index) in props.form.previewUrls"
              :key="index"
              class="w-full"
            >
              <div class="relative aspect-[16/9] w-full">
                <img
                  :src="url"
                  class="h-full w-full object-cover"
                  :alt="`Event image ${index + 1}`"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <div class="absolute right-4 top-4 z-10 flex space-x-3">
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
            :aria-label="t('share')"
          >
            <Share class="h-6 w-6 text-gray-700" />
          </button>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
            :aria-label="t('favorite')"
          >
            <Heart class="h-6 w-6 text-red-500" />
          </button>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
            :aria-label="t('options')"
          >
            <MoreHorizontal class="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div
          class="absolute bottom-4 right-4 z-10 rounded-full bg-black/70 px-3 py-1 text-sm text-white"
        >
          {{ currentSlide + 1 }}{{ t('slash') }}{{ form.previewUrls.length }}
        </div>
      </template>

      <template v-else>
        <div
          class="aspect-[16/9] w-full rounded-2xl border-2 border-dashed border-gray-300 p-12"
        >
          <div
            class="flex h-full flex-col items-center justify-center text-center"
          >
            <Image class="mb-4 h-12 w-12 text-gray-400" />
            <p class="text-gray-500">{{ t('noImages') }}</p>
          </div>
        </div>
      </template>
    </div>

    <div class="p-4 sm:p-6">
      <div class="flex items-start gap-6">
        <div class="flex flex-col items-center text-center">
          <span class="text-primary text-lg font-medium">{{
            formatDate(form.startDate, { weekday: 'long' })
          }}</span>
          <span class="text-primary text-[2.5rem] font-bold leading-tight">{{
            formatDate(form.startDate, { day: 'numeric' })
          }}</span>
          <span class="text-primary text-lg font-medium">{{
            formatDate(form.startDate, { month: 'short' })
          }}</span>
          <span class="text-primary mt-2 text-xl font-semibold">{{
            form.startTime
          }}</span>
        </div>

        <div class="h-auto w-px self-stretch bg-gray-200"></div>

        <div class="-ml-4 -mt-1 flex-1 overflow-hidden">
          <h1
            class="whitespace-pre-wrap break-words text-[2rem] font-bold leading-tight text-gray-900"
            :class="{
              'text-2xl': form.name.length > 50,
              'text-xl': form.name.length > 100,
            }"
          >
            {{ props.form.name }}
          </h1>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="mb-3 text-xl font-semibold">{{ t('description') }}</h2>
        <p class="whitespace-pre-wrap text-gray-700">
          {{ props.form.description }}
        </p>
      </div>

      <div class="mt-6">
        <h2 class="mb-3 text-xl font-semibold">{{ t('highlights') }}</h2>

        <div v-if="props.form.previewUrls.length > 0" class="relative">
          <div class="grid grid-cols-6 gap-2 overflow-hidden rounded-2xl">
            <div class="relative col-span-4 aspect-[4/3]">
              <img
                :src="props.form.previewUrls[0]"
                class="h-full w-full object-cover"
                alt="Main highlight"
              />
            </div>

            <div class="col-span-2 grid grid-rows-2 gap-2">
              <div
                v-if="props.form.previewUrls.length > 1"
                class="relative aspect-[4/3]"
              >
                <img
                  :src="props.form.previewUrls[1]"
                  class="h-full w-full object-cover"
                  alt="Second highlight"
                />
              </div>

              <div class="relative aspect-[4/3]">
                <div
                  v-if="props.form.previewUrls.length > 2"
                  class="relative h-full"
                >
                  <img
                    :src="props.form.previewUrls[2]"
                    class="h-full w-full object-cover"
                    alt="Third highlight"
                  />
                  <div
                    v-if="props.form.previewUrls.length > 3"
                    class="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50"
                  >
                    <div class="text-center text-white">
                      <div class="mb-1 flex items-center justify-center">
                        <Grid class="h-6 w-6" />
                      </div>
                      <span class="text-sm font-medium">{{ t('seeAll') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <div class="flex flex-col items-center">
            <Image class="mb-4 h-12 w-12 text-gray-400" />
            <p class="text-gray-500">{{ t('noHighlights') }}</p>
          </div>
        </div>

        <div class="mt-6">
          <h2 class="mb-3 text-2xl font-bold">{{ t('organizer') }}</h2>
          <div class="flex items-center gap-4">
            <AccountProfilePicture
              :account-id="store.signedInAccountId || ''"
              classes="h-16 w-16 rounded-full bg-gray-100"
              height="64"
              width="64"
            />
            <h3 class="text-xl font-semibold text-[#5B47D9]">
              {{ store.signedInUsername }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Share, Heart, MoreHorizontal, Grid, Image } from 'lucide-vue-next'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/scn/carousel'

const { t } = useI18n()
const currentSlide = ref(0)
const store = useMaevsiStore()

const handleSlideChange = (index: number) => {
  currentSlide.value = index
}

const props = defineProps({
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

<style scoped>
.text-primary {
  color: #5b47d9;
}
</style>

<i18n lang="yaml">
de:
  description: Beschreibung
  favorite: Favorit
  highlights: Highlights
  noHighlights: Keine Highlights verfügbar
  noImages: Keine Bilder verfügbar
  options: Optionen
  organizer: Organisator
  seeAll: Alle anzeigen
  share: Teilen
  slash: /
en:
  description: Description
  favorite: Favorite
  highlights: Highlights
  noHighlights: No highlights available
  noImages: No images available
  options: Options
  organizer: Organizer
  seeAll: See All
  share: Share
  slash: /
</i18n>
