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
      {{ description.length }}{{ t('maxCharacters') }}
    </div>
    <div>
      <h2 class="mb-4 text-sm">{{ t('websiteUrl') }}</h2>
      <div
        class="flex items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
      >
        <input
          v-model="eventForm.website"
          type="url"
          class="flex-1 border-0 text-lg text-gray-600 placeholder:text-gray-400 focus:outline-none"
          :placeholder="t('urlPlaceholder')"
          @input="onDetailsInput"
        />
        <Link2 class="h-6 w-6 text-black" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Link2 } from 'lucide-vue-next'
import { useEventForm } from '~/composables/useEventForm'

const { form: eventForm } = useEventForm()

const { t } = useI18n()
const description = ref('')

const emit = defineEmits<{
  updateForm: [value: Partial<typeof props.form>]
}>()

const onDetailsInput = () => {
  emit('updateForm', {
    description: eventForm.value.description,
    website: eventForm.value.website,
  })
}
</script>

<i18n lang="yaml">
de:
  websiteUrl: Website URL
  urlPlaceholder: Gib die URL deiner Website ein
  eventDescription: Veranstaltungsbeschreibung
  eventDescriptionPlaceholder: Beschreibe deine Veranstaltung...
  maxCharacters: '/2500'
en:
  websiteUrl: Website URL
  urlPlaceholder: Enter the URL of your website
  eventDescription: Event description
  eventDescriptionPlaceholder: Describe your event...
  maxCharacters: '/2500'
</i18n>
