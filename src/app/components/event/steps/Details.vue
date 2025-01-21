<template>
  <div>
    <h2 class="mb-4 text-xl">{{ t('eventDescription') }}</h2>
    <div class="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      <textarea
        v-model="eventForm.description"
        class="min-h-[400px] w-full resize-none border-0 text-lg text-gray-600 placeholder:text-gray-400 focus:outline-none"
        :placeholder="t('eventDescriptionPlaceholder')"
        maxlength="2500"
        @input="onDetailsInput"
      />
    </div>
    <div class="mt-2 text-right text-lg text-gray-600">
      {{ eventForm.description.length }}{{ t('maxCharacters') }}
    </div>
    <div>
      <h2 class="mb-4 text-sm">{{ t('websiteUrl') }}</h2>
      <div
        class="flex items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
        :class="{ 'border-red-500': eventForm.website && !isValidWebsite }"
      >
        <input
          v-model="eventForm.website"
          type="url"
          class="flex-1 border-0 text-lg text-gray-600 placeholder:text-gray-400 focus:outline-none"
          :placeholder="t('urlPlaceholder')"
          @input="onDetailsInput"
        />
        <Link2
          class="h-6 w-6"
          :class="isValidWebsite ? 'text-green-500' : 'text-black'"
        />
      </div>
      <span
        v-if="eventForm.website && !isValidWebsite"
        class="mt-1 text-sm text-red-500"
      >
        {{ t('pleaseEnterValidUrl') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'
import { Link2 } from 'lucide-vue-next'
import { useEventForm } from '~/composables/useEventForm'

const { form: eventForm } = useEventForm()

const props = defineProps<{
  form: {
    description: string
    website: string
  }
  validation: BaseValidation
}>()

const { t } = useI18n()

const emit = defineEmits<{
  updateForm: [value: Partial<typeof props.form>]
}>()

const isValidWebsite = ref(false)

const validateWebsite = (url: string) => {
  try {
    if (!url.startsWith('https://')) return false

    const urlObj = new URL(url)

    const validTLDs = /\.(com|org|net|edu|gov|io|co|[a-z]{2})$/i
    const hasValidHostname =
      urlObj.hostname.includes('.') &&
      urlObj.hostname.length > 3 &&
      /^[a-zA-Z0-9][a-zA-Z0-9-._]+[a-zA-Z0-9]$/.test(urlObj.hostname) &&
      validTLDs.test(urlObj.hostname)

    return hasValidHostname
  } catch {
    return false
  }
}

const onDetailsInput = () => {
  isValidWebsite.value = validateWebsite(eventForm.value.website)

  if (isValidWebsite.value) {
    emit('updateForm', {
      ...props.form,
      description: eventForm.value.description,
      website: eventForm.value.website,
    })
  }
}
</script>

<i18n lang="yaml">
de:
  eventDescription: Veranstaltungsbeschreibung
  eventDescriptionPlaceholder: Beschreibe deine Veranstaltung...
  maxCharacters: '/2500'
  pleaseEnterValidUrl: Bitte gib eine gültige URL ein
  urlPlaceholder: Gib die URL deiner Website ein
  websiteUrl: Website URL

en:
  eventDescription: Event description
  eventDescriptionPlaceholder: Describe your event...
  maxCharacters: '/2500'
  pleaseEnterValidUrl: Please enter a valid URL
  urlPlaceholder: Enter the URL of your website
  websiteUrl: Website URL
</i18n>
