<template>
  <div>
    <div v-if="store.jwtDecoded?.role === 'maevsi_account'">
      <Form
        :errors="[]"
        :form="v$"
        :is-form-sent="isFormSent"
        :submit-name="v$.id.$model ? t('eventUpdate') : t('eventCreate')"
        @submit.prevent="() => {}"
      >
        <Stepper
          v-model="stepIndex"
          :total-steps="5"
          class="flex min-h-screen flex-col"
        >
          <div class="flex w-full justify-center gap-2 py-4">
            <StepperItem
              v-for="step in 5"
              :key="step"
              v-slot="{ state }"
              class="relative flex items-center"
              :step="step"
            >
              <div
                class="h-2.5 w-2.5 rounded-full transition-colors duration-200"
                :class="[
                  state === 'active' ? 'bg-primary' : 'bg-gray-200',
                  state === 'completed' ? 'bg-primary' : '',
                ]"
              />
            </StepperItem>
          </div>

          <div class="flex-1 px-4">
            <h2 class="mb-2 text-2xl font-bold">
              {{ stepTitles[stepIndex - 1] }}
            </h2>
            <p class="mb-4 text-sm text-gray-500">
              {{ t('allFieldsRequired') }}
            </p>

            <div class="space-y-6">
              <EventStepsPrimarySettings
                v-if="stepIndex === 1"
                :form="form"
                :validation="v$"
              />
              <EventStepsDateLocation
                v-else-if="stepIndex === 2"
                :form="form"
                :validation="v$"
              />
              <EventStepsCover
                v-else-if="stepIndex === 3"
                :form="form"
                :validation="v$"
              />
              <EventStepsDetails
                v-else-if="stepIndex === 4"
                :form="form"
                :validation="v$"
              />
              <EventStepsVisibility
                v-else-if="stepIndex === 5"
                :form="form"
                :validation="v$"
              />
            </div>

            <div class="mt-6">
              <ButtonColored
                :aria-label="stepIndex === 5 ? t('create') : t('next')"
                :disabled="false"
                class="w-full"
                :type="stepIndex === 5 ? 'submit' : 'button'"
                @click="handleNext"
              >
                {{ stepIndex === 5 ? t('create') : t('next') }}
              </ButtonColored>
            </div>
          </div>
        </Stepper>
      </Form>
    </div>
    <LayoutCallToAction
      v-else
      :call-to-action="t('anonymousCta')"
      :call-to-action-description="t('anonymousCtaDescription')"
    />
  </div>
</template>

<script setup lang="ts">
import { useEventForm } from '~/composables/useEventForm'

const handleNext = () => {
  if (stepIndex.value < 5) {
    stepIndex.value++
  }
}

const { t } = useI18n()
const store = useMaevsiStore()

const { form, v$ } = useEventForm()

const stepIndex = ref(1)
const isFormSent = ref(false)

const stepTitles = [
  t('primarySettings'),
  t('dateAndLocation'),
  t('coverImage'),
  t('eventDetails'),
  t('visibility'),
]

// data
const title = t('title')

useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  anonymousCta: Finde ihn auf maevsi
  anonymousCtaDescription: Du suchst einen liebevollen Ort für deine Veranstaltung?
  title: Veranstaltung erstellen
  next: Weiter
  create: Erstellen
  eventUpdate: Änderungen speichern
  eventCreate: Veranstaltung erstellen
  allFieldsRequired: Alle Felder sind erforderlich
  primarySettings: Grundeinstellungen
  dateAndLocation: Datum und Ort
  coverImage: Titelbild
  eventDetails: Veranstaltungsdetails
  visibility: Sichtbarkeit
en:
  anonymousCta: Find it on maevsi
  anonymousCtaDescription: Are you looking for a loving place for your event?
  title: Create event
  next: Next
  create: Create
  eventUpdate: Save changes
  eventCreate: Create event
  allFieldsRequired: All fields are required
  primarySettings: Primary settings
  dateAndLocation: Date and location
  coverImage: Cover image
  eventDetails: Event details
  visibility: Visibility
</i18n>
