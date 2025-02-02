<template>
  <div>
    <div v-if="jwtDecoded?.role === 'maevsi_account'">
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
              class="h-2.5 w-2.5 rounded-full border transition-colors duration-200"
              :class="[
                state === 'active'
                  ? 'h-4 w-4 border-accent-weak bg-accent-strong'
                  : '',
                state === 'completed'
                  ? 'h-3 w-3 border-transparent bg-accent-strong'
                  : '',
                state !== 'active' && state !== 'completed'
                  ? 'border-transparent bg-gray-300'
                  : '',
              ]"
            />
          </StepperItem>
        </div>

        <div class="flex-1 md:px-12">
          <h2 class="mb-2 text-2xl font-bold">
            {{ stepTitles[stepIndex - 1] }}
          </h2>

          <div class="space-y-6">
            <EventStepsPrimarySettings
              v-if="stepIndex === 1"
              :form="form"
              :validation="v$"
              @update-form="
                (updatedForm: any) => Object.assign(form, updatedForm)
              "
            />
            <EventStepsDateLocation
              v-else-if="stepIndex === 2"
              :form="form"
              :validation="v$"
              @update-form="
                (updatedForm: any) => Object.assign(form, updatedForm)
              "
            />
            <EventStepsDetails
              v-else-if="stepIndex === 3"
              :form="form"
              :validation="v$"
              @update-form="
                (updatedForm: any) => Object.assign(form, updatedForm)
              "
            />
            <EventStepsCover
              v-else-if="stepIndex === 4"
              :form="form"
              :validation="v$"
              @update-form="(updatedForm) => Object.assign(form, updatedForm)"
            />

            <EventStepsVisibility
              v-else-if="stepIndex === 5"
              :form="form"
              :validation="v$"
              @update-form="(updatedForm) => Object.assign(form, updatedForm)"
            />
            <EventStepsPreview
              v-else-if="stepIndex === 6"
              :form="form"
              :validation="v$"
              @update-form="(updatedForm) => Object.assign(form, updatedForm)"
            />
          </div>

          <div class="mt-6">
            <ShadButton
              variant="default"
              class="w-full bg-accent-fancy text-white hover:bg-accent-strong/90"
              :aria-label="stepIndex === 5 ? t('preview') : t('next')"
              :disabled="!isStepValid"
              :type="stepIndex === 6 ? 'submit' : 'button'"
              @click="handleNext"
            >
              {{
                stepIndex === 5
                  ? t('preview')
                  : stepIndex === 6
                    ? t('saveAndPublishing')
                    : t('next')
              }}
            </ShadButton>
          </div>
          <div class="mt-4">
            <ShadButton
              v-if="stepIndex === 4"
              variant="outline"
              class="w-full"
              @click="handleNext"
            >
              {{ t('skipThisStep') }}
            </ShadButton>
          </div>
          <div class="mt-4">
            <ShadButton
              v-if="stepIndex === 6"
              variant="outline"
              class="w-full"
              @click="handleDraftSave"
            >
              {{ t('saveDraft') }}
            </ShadButton>
          </div>
        </div>
      </Stepper>
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
import { useCreateEventMutation } from '~~/gql/documents/mutations/event/eventCreate'
import { useUploadCreateMutation } from '~~/gql/documents/mutations/upload/uploadCreate'
import { Uppy } from '@uppy/core'

import { EventVisibility } from '~~/gql/generated/graphql'
import Tus from '@uppy/tus'
import type { EventStorageStrategy } from '~/composables/storage/EventStorageStrategy'
import { LocalStorageStrategy } from '~/composables/storage/LocalStorageStrategy'

const { t } = useI18n()
const store = useMaevsiStore()
const { jwtDecoded } = storeToRefs(store)

const stepIndex = ref(1)
const isFormSent = ref(false)

const runtimeConfig = useRuntimeConfig()
const TUSD_FILES_URL = useTusdFilesUrl()

const {
  form,
  v$,
  isStepOneValid,
  isStepTwoValid,
  isStepThreeValid,
  isStepFiveValid,
} = useEventForm()

const stepTitles = [
  t('primarySettings'),
  t('dateAndLocation'),
  t('eventDetails'),
  t('coverImage'),

  t('visibility'),
  t('previewHeading'),
]

const isStepValid = computed(() => {
  switch (stepIndex.value) {
    case 1:
      return (
        form.value.name.trim() !== '' &&
        form.value.category !== '' &&
        (form.value.isInPerson || form.value.isRemote)
      )
    case 2:
      return (
        form.value.startDate !== '' &&
        form.value.endDate !== '' &&
        form.value.address !== ''
      )
    case 3:
      return form.value.description !== '' && form.value.website !== ''

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
        isValid = await isStepTwoValid()
        break
      case 3:
        isValid = await isStepThreeValid()
        break
      case 4:
        // Cover images are optional
        isValid = true
        break
      case 5:
        isValid = await isStepFiveValid()
        break
      case 6:
        await handleSubmit()

        break

      default:
        isValid = true
    }

    if (isValid && stepIndex.value < 6) {
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

const createEventMutation = useCreateEventMutation()
const uploadCreateMutation = useUploadCreateMutation()
const storageStrategy = ref<EventStorageStrategy>(
  LocalStorageStrategy.getInstance(),
)

const localePath = useLocalePath()

const handleSubmit = async () => {
  try {
    const isValid = await v$.value.$validate()

    if (!isValid) {
      v$.value.$touch()
      return
    }

    if (!store.signedInAccountId) throw new Error('Account id is missing!')

    isFormSent.value = true

    const result = await createEventMutation.executeMutation({
      createEventInput: {
        event: {
          authorAccountId: store.signedInAccountId,
          name: form.value.name,
          slug: form.value.slug,
          description: form.value.description || null,
          isInPerson: form.value.isInPerson,
          isRemote: form.value.isRemote,
          start: form.value.startDate || null,
          end: form.value.endDate || null,
          location: form.value.address || null,
          visibility: form.value.visibility || EventVisibility.Private,
          inviteeCountMaximum: form.value.inviteeCountMaximum
            ? +form.value.inviteeCountMaximum
            : null,
          url: form.value.website,
        },
      },
    })

    if (result.error || !result.data) {
      throw new Error('Event creation failed')
    }

    if (form.value.images?.length) {
      try {
        for (const file of form.value.images) {
          const uploadResult = await uploadCreateMutation.executeMutation({
            uploadCreateInput: {
              sizeByte: file.size,
            },
          })

          if (!uploadResult.data?.uploadCreate?.upload?.id) {
            throw new Error('Upload creation failed')
          }

          const uppy = new Uppy({
            id: 'event-images',
            debug: !runtimeConfig.public.vio.isInProduction,
            restrictions: {
              maxFileSize: 1048576,
              maxNumberOfFiles: 1,
              minNumberOfFiles: 1,
              allowedFileTypes: ['image/*'],
            },
            meta: {
              maevsiUploadUuid: uploadResult.data.uploadCreate.upload.id,
            },
          })

          uppy.use(Tus, {
            endpoint: TUSD_FILES_URL,
            limit: 1,
            removeFingerprintOnSuccess: true,
          })

          uppy.addFile({
            source: 'event-images',
            name: `/event-images/${file.name}`,
            type: file.type,
            data: file,
          })

          const result = await uppy.upload()
          if (result && result.failed && result.failed.length > 0) {
            console.error()
          }
        }
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError)
      }
    }

    showToast({ title: t('eventCreateSuccess') })

    if (!store.signedInUsername || !form.value.slug) {
      throw new Error(
        'Aborting navigation: required data for path templating is missing!',
      )
    }

    await navigateTo(
      localePath({
        name: 'event-view-username-event_name',
        params: {
          username: store.signedInUsername,
          event_name: form.value.slug,
        },
      }),
    )
  } catch (error) {
    console.error('Form submission error:', error)
    isFormSent.value = false
  }
}

const handleDraftSave = async () => {
  await storageStrategy.value.saveEvent(form.value)
  await navigateTo(
    localePath({
      name: 'event-view-username',
      params: { username: store.signedInUsername },
    }),
  )
  showToast({ title: t('draftSaved') })
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
  coverImage: Titelbild
  dateAndLocation: Datum und Ort
  eventCreateSuccess: Veranstaltung erfolgreich erstellt.
  eventDetails: Veranstaltungsdetails
  next: Weiter
  primarySettings: Grundeinstellungen
  skipThisStep: Diesen Schritt überspringen
  visibility: Sichtbarkeit
  preview: Vorschau des Ereignisses
  previewHeading: Ereignisvorschau
  saveAndPublishing: Speichern und zur Veröffentlichung
  saveDraft: Als Entwurf speichern
  draftSaved: Entwurf erfolgreich gespeichert

en:
  anonymousCta: Find it on maevsi
  anonymousCtaDescription: Are you looking for a loving place for your event?
  coverImage: Cover and Highlights
  dateAndLocation: Date and location
  eventCreateSuccess: Event created successfully.
  eventDetails: Details
  next: Next
  primarySettings: Primary settings
  skipThisStep: Skip this step
  visibility: Visibility
  preview: Preview the Event
  previewHeading: Event Preview
  saveAndPublishing: Save and go to publishing
  saveDraft: Save as draft
  draftSaved: Draft saved successfully
</i18n>
