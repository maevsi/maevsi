<template>
  <div>
    <div v-if="jwtDecoded?.role === 'maevsi_account'">
      <Form
        :errors="[]"
        :form="v$"
        :is-form-sent="isFormSent"
        :submit-name="form.id ? t('eventUpdate') : t('eventCreate')"
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

          <!-- Content section -->
          <div class="flex-1 px-4">
            <h2 class="mb-2 text-2xl font-bold">
              {{ stepTitles[stepIndex - 1] }}
            </h2>
            <p class="mb-4 text-sm text-gray-500">
              {{ t('allFieldsRequired') }}
            </p>

            <!-- Steps -->
            <div class="space-y-6">
              <EventStepsPrimarySettings
                v-if="stepIndex === 1"
                :form="form"
                :validation="v$"
                @update-form="(updatedForm) => Object.assign(form, updatedForm)"
              />

              <EventStepsDateLocation
                v-else-if="stepIndex === 2"
                :form="form"
                :validation="v$"
                @update-form="(updatedForm) => Object.assign(form, updatedForm)"
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
                :disabled="!isStepValid"
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
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useEventForm } from '~/composables/useEventForm'

const { t } = useI18n()
const store = useMaevsiStore()
const { jwtDecoded } = storeToRefs(store)

const stepIndex = ref(1)
const isFormSent = ref(false)

const { form, v$, isStepOneValid, isStepTwoValid } = useEventForm()

const stepTitles = [
  t('primarySettings'),
  t('dateAndLocation'),
  t('coverImage'),
  t('eventDetails'),
  t('visibility'),
]

//TODO: check all fields together instead of individual
const isStepValid = computed(() => {
  switch (stepIndex.value) {
    case 1:
      return (
        form.value.name.trim() !== '' &&
        form.value.format !== '' &&
        form.value.category !== '' &&
        (form.value.isInPerson || form.value.isRemote)
      )
    case 2:
      return (
        form.value.startDate !== '' &&
        form.value.endDate !== '' &&
        form.value.street !== '' &&
        form.value.city !== '' &&
        form.value.postcode !== '' &&
        form.value.country !== ''
      )
    case 3:
      return true
    case 4:
      return form.value.description !== ''
    case 5:
      return form.value.visibility !== null
    default:
      return true
  }
})
const handleNext = async () => {
  try {
    let isValid = false

    switch (stepIndex.value) {
      case 1:
        isValid = await isStepOneValid()
        break
      case 2:
        console.log('here')

        isValid = await isStepTwoValid()
        console.log('isValid', isValid)
        break

      default:
        isValid = true
    }

    if (isValid && stepIndex.value < 5) {
      stepIndex.value++
    } else if (!isValid) {
      v$.value.$touch()
    }
  } catch (error) {
    console.error('Error in handleNext:', error)
  }
}

const handlePrevious = () => {
  if (stepIndex.value > 1) {
    stepIndex.value--
  }
}

const handleSubmit = async () => {
  try {
    const isValid = await v$.value.$validate()

    if (isValid) {
      isFormSent.value = true

      // TODO: Implement actual form submission logic
    } else {
      v$.value.$touch()
      console.error('Final form validation failed')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    isFormSent.value = false
  }
}

defineExpose({
  handleNext,
  handlePrevious,
  handleSubmit,
  stepIndex,
  isStepValid,
})
</script>

<i18n lang="yaml">
de:
  anonymousCta: Finde ihn auf maevsi
  anonymousCtaDescription: Du suchst einen liebevollen Ort für deine Veranstaltung?
  # title: Veranstaltung erstellen
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
  # title: Create event
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
