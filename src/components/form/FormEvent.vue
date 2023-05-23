<template>
  <div>
    <Form
      :errors="api.errors"
      :form="v$"
      :is-form-sent="isFormSent"
      :submit-name="v$.id.$model ? t('eventUpdate') : t('eventCreate')"
      @submit.prevent="submit"
    >
      <FormInput
        class="hidden"
        id-label="input-id"
        title="id"
        type="number"
        placeholder="id"
        :value="v$.id"
        @input="form.id = $event"
      />
      <FormInput
        id-label="input-name"
        is-required
        is-validatable
        :placeholder="t('namePlaceholder')"
        :title="t('name')"
        type="text"
        :validation-property="v$.slug"
        :value="v$.name"
        @input="onInputName($event)"
      >
        <template #stateWarning>
          <FormInputStateWarning v-if="event && event.name !== form.name">
            {{ t('validationWarningNameChangeSlug') }}
          </FormInputStateWarning>
        </template>
        <template #stateError>
          <FormInputStateError
            :form-input="v$.slug"
            is-validation-live
            validation-property="existenceNone"
          >
            {{ t('validationExistenceNone', { slug: v$.slug?.$model }) }}
          </FormInputStateError>
          <FormInputStateError
            :form-input="v$.name"
            validation-property="maxLength"
          >
            {{ t('globalValidationLength') }}
          </FormInputStateError>
          <FormInputStateError
            :form-input="v$.name"
            validation-property="required"
          >
            {{ t('globalValidationRequired') }}
          </FormInputStateError>
        </template>
      </FormInput>
      <FormInput
        class="hidden"
        id-label="input-slug"
        is-required
        :placeholder="t('slugPlaceholder')"
        :title="t('slug')"
        type="text"
        :value="v$.slug"
        @input="form.slug = $event"
      >
        <template #stateError>
          <FormInputStateError
            :form-input="v$.slug"
            validation-property="formatSlug"
          >
            {{ t('globalValidationFormat') }}
          </FormInputStateError>
          <FormInputStateError
            :form-input="v$.slug"
            validation-property="maxLength"
          >
            {{ t('globalValidationLength') }}
          </FormInputStateError>
          <FormInputStateError
            :form-input="v$.slug"
            validation-property="required"
          >
            {{ t('globalValidationRequired') }}
          </FormInputStateError>
        </template>
      </FormInput>
      <FormInput
        v-if="v$.visibility"
        id-label="input-visibility"
        is-required
        :title="t('visibility')"
        type="radio"
        :value="v$.visibility"
        @input="form.visibility = $event as EventVisibility"
      >
        <FormRadioButtonGroup
          id="input-visibility"
          v-model="v$.visibility.$model"
          name="visibility"
          :titles-values="[
            [t('visibilityPublic'), 'PUBLIC'],
            [t('visibilityPrivate'), 'PRIVATE'],
          ]"
        />
        <template #stateError>
          <FormInputStateError
            :form-input="v$.visibility"
            validation-property="required"
          >
            {{ t('globalValidationRequired') }}
          </FormInputStateError>
        </template>
      </FormInput>
      <FormInput
        v-if="v$.visibility.$model === 'PUBLIC'"
        id-label="input-invitee-count-maximum"
        :title="t('maximumInviteeCount')"
        type="number"
        :value="v$.inviteeCountMaximum"
        @input="form.inviteeCountMaximum = $event"
      >
        <template #stateError>
          <FormInputStateError
            :form-input="v$.inviteeCountMaximum"
            validation-property="maxValue"
          >
            {{ t('globalValidationMaxValue') }}
          </FormInputStateError>
          <FormInputStateError
            :form-input="v$.inviteeCountMaximum"
            validation-property="minValue"
          >
            {{ t('globalValidationMinValue') }}
          </FormInputStateError>
        </template>
      </FormInput>
      <FormInput
        id-label="input-start"
        is-readonly
        is-required
        :placeholder="dateTimeFormatter(new Date().toISOString())"
        :title="t('start')"
        type="text"
        :value="v$.start"
        :value-formatter="dateTimeFormatter"
        :warning="isWarningStartPastShown"
        @click="store.modals.push({ id: 'ModalDateTimeStart' })"
      >
        <template #stateError>
          <FormInputStateError
            :form-input="v$.start"
            validation-property="required"
          >
            {{ t('globalValidationRequired') }}
          </FormInputStateError>
        </template>
        <template #stateWarning>
          <FormInputStateWarning v-if="isWarningStartPastShown">
            {{ t('globalValidationNowOrFuture') }}
          </FormInputStateWarning>
        </template>
      </FormInput>
      <FormInput
        id-label="input-end"
        is-readonly
        :placeholder="dateTimeFormatter(new Date().toISOString())"
        :title="t('end')"
        type="text"
        :value="v$.end"
        :value-formatter="dateTimeFormatter"
        @click="store.modals.push({ id: 'ModalDateTimeEnd' })"
        @icon="v$.end.$model = undefined"
      >
        <template v-if="v$.end.$model" #icon>
          <IconX />
        </template>
      </FormInput>
      <FormInput :title="t('attendanceType')" type="checkbox">
        <FormCheckbox
          form-key="is-in-person"
          :value="v$.isInPerson.$model"
          @change="form.isInPerson = $event"
        >
          {{ t('isInPerson') }}
        </FormCheckbox>
        <FormCheckbox
          form-key="is-remote"
          :value="v$.isRemote.$model"
          @change="form.isRemote = $event"
        >
          {{ t('isRemote') }}
        </FormCheckbox>
      </FormInput>
      <FormInput
        v-if="v$.isInPerson.$model"
        id-label="input-location"
        :placeholder="t('globalPlaceholderAddress').replace('\n', ' ')"
        :title="t('location')"
        type="text"
        :value="v$.location"
        @input="form.location = $event"
      >
        <template #stateError>
          <FormInputStateError
            :form-input="v$.location"
            validation-property="maxLength"
          >
            {{ t('globalValidationLength') }}
          </FormInputStateError>
        </template>
        <template #stateInfo>
          <FormInputStateInfo>
            {{ t('stateInfoLocation') }}
          </FormInputStateInfo>
        </template>
      </FormInput>
      <FormInputUrl
        v-if="v$.isRemote.$model"
        :form-input="v$.url"
        @input="form.url = $event"
      />
      <FormInput
        :title="t('description')"
        type="tiptap"
        :value="v$.description"
        @input="form.description = $event"
      >
        <client-only v-if="v$.description">
          <TipTap v-model.trim="v$.description.$model" />
        </client-only>
        <template #stateError>
          <FormInputStateError
            :form-input="v$.description"
            validation-property="maxLength"
          >
            {{ t('globalValidationLength') }}
          </FormInputStateError>
        </template>
      </FormInput>
    </Form>
    <Modal id="ModalDateTimeStart">
      <client-only>
        <div class="flex justify-center">
          <v-date-picker
            v-model="v$.start.$model"
            :is24hr="$i18n.locale !== 'en'"
            is-dark
            :locale="$i18n.locale"
            :masks="{ input: 'YYYY-MM-DD h:mm A' }"
            :max-date="v$.end.$model"
            :minute-increment="5"
            mode="dateTime"
          />
        </div>
      </client-only>
    </Modal>
    <Modal id="ModalDateTimeEnd">
      <client-only>
        <div class="flex justify-center">
          <v-date-picker
            v-model="v$.end.$model"
            :is24hr="$i18n.locale !== 'en'"
            is-dark
            :locale="$i18n.locale"
            :masks="{ input: 'YYYY-MM-DD h:mm A' }"
            :min-date="v$.start.$model"
            :minute-increment="5"
            mode="dateTime"
          />
        </div>
      </client-only>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import {
  helpers,
  maxLength,
  maxValue,
  minValue,
  required,
} from '@vuelidate/validators'
import slugify from 'slugify'

import { useMaevsiStore } from '~/store'
import { useCreateEventMutation } from '~/gql/documents/mutations/event/eventCreate'
import { useUpdateEventByIdMutation } from '~/gql/documents/mutations/event/eventUpdateById'
import { EventItemFragment, EventVisibility } from '~/gql/generated/graphql'

export interface Props {
  event?: Pick<EventItemFragment, 'name' | 'slug'>
}
const props = withDefaults(defineProps<Props>(), {
  event: undefined,
})

const localePath = useLocalePath()
const { locale, t } = useI18n()
const store = useMaevsiStore()

// api data
const createEventMutation = useCreateEventMutation()
const updateEventMutation = useUpdateEventByIdMutation()
const api = getApiData([createEventMutation, updateEventMutation])

// data
const form = reactive({
  id: ref<string>(),
  authorUsername: ref<string>(),
  description: ref<string>(),
  end: ref<string>(),
  inviteeCountMaximum: ref<string>(),
  isInPerson: ref<boolean>(),
  isRemote: ref<boolean>(),
  location: ref<string>(),
  name: ref<string>(),
  slug: ref<string>(),
  start: ref<string>(),
  url: ref<string>(),
  visibility: ref<EventVisibility>(),
})

const isFormSent = ref(false)
const signedInUsername = ref(store.signedInUsername)

// methods
const dateTimeFormatter = (x?: string) =>
  x
    ? new Date(x).toLocaleString(locale.value, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : undefined
const onInputName = ($event: any) => {
  v$.value.name.$model = $event
  updateSlug()
}
const submit = async () => {
  if (!(await isFormValid({ v$, isFormSent }))) return

  if (form.id) {
    // Edit
    const result = await updateEventMutation.executeMutation({
      id: form.id,
      eventPatch: {
        authorUsername: signedInUsername.value,
        description: form.description || null,
        end: form.end || null,
        inviteeCountMaximum: form.inviteeCountMaximum
          ? +form.inviteeCountMaximum
          : null,
        isInPerson: form.isInPerson,
        isRemote: form.isRemote,
        location: form.location || null,
        name: form.name || null,
        slug: form.slug || null,
        start: form.start || null,
        url: form.url || null,
        visibility: form.visibility || null,
      },
    })

    if (result.error || !result.data) return

    showToast({ title: t('updated') })
  } else {
    // Add
    const result = await createEventMutation.executeMutation({
      createEventInput: {
        event: {
          authorUsername: signedInUsername.value || '',
          description: form.description || null,
          end: form.end || null,
          inviteeCountMaximum: form.inviteeCountMaximum
            ? +form.inviteeCountMaximum
            : null,
          isInPerson: form.isInPerson,
          isRemote: form.isRemote,
          location: form.location || null,
          name: form.name || '',
          slug: form.slug || '',
          start: form.start || null,
          url: form.url || null,
          visibility: form.visibility || EventVisibility.Private,
        },
      },
    })

    if (result.error || !result.data) return

    showToast({ title: t('eventCreateSuccess') })
    await navigateTo(
      localePath(`/event/${signedInUsername.value}/${form.slug}`)
    )
  }
}

const updateForm = (data?: Pick<EventItemFragment, 'name' | 'slug'>) => {
  if (!data) return

  for (const [k, v] of Object.entries(data)) {
    ;(form as Record<string, any>)[k] = v
  }
}

const updateSlug = () => {
  form.slug = slugify(form.name ?? '', {
    lower: true,
    strict: true,
  })
}

// computations
const isWarningStartPastShown = computed(
  () => !!form.start && new Date(form.start) < new Date()
)

// vuelidate
const rules = {
  id: {},
  authorUsername: {},
  description: {
    maxLength: maxLength(VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM),
  },
  end: {},
  inviteeCountMaximum: {
    maxValue: maxValue(Math.pow(2, 31) - 1), // PostgrSQL's positive end of range for integers.
    minValue: minValue(1),
  },
  isInPerson: {},
  isRemote: {},
  location: {
    maxLength: maxLength(VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM),
  },
  name: {
    maxLength: maxLength(VALIDATION_EVENT_NAME_LENGTH_MAXIMUM),
    required,
  },
  slug: {
    existenceNone: helpers.withAsync(
      validateEventSlug(store.signedInUsername || '', true, props.event?.slug)
    ),
    maxLength: maxLength(VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM),
    required,
    formatSlug: VALIDATION_FORMAT_SLUG,
  },
  start: {
    required,
  },
  url: {
    formatUrlHttps: VALIDATION_FORMAT_URL_HTTPS,
    maxLength: maxLength(VALIDATION_EVENT_URL_LENGTH_MAXIMUM),
  },
  visibility: {
    required,
  },
}

const v$ = useVuelidate(rules, form)

// lifecycle
watch(
  () => props.event,
  (currentValue, _oldValue) => {
    updateForm(currentValue)
  }
)

// initialization
updateForm(props.event)
</script>

<style>
@import url('~/node_modules/v-calendar/dist/style.css');
</style>

<i18n lang="yaml">
de:
  attendanceType: Anwesenheitstyp
  description: Einladungstext
  end: Ende
  eventCreate: Veranstaltung erstellen
  eventCreateSuccess: Veranstaltung erfolgreich erstellt.
  eventUpdate: Änderungen speichern
  stateInfoLocation: Ein Suchbegriff für Google Maps.
  isInPerson: vor Ort
  isRemote: digital
  maximumInviteeCount: Maximale Gästezahl
  name: Name
  namePlaceholder: Willkommensfeier
  location: Ort
  slug: Slug
  slugPlaceholder: willkommensfeier
  start: Beginn
  updated: Aktualisiert
  validationExistenceNone: Du hast bereits eine Veranstaltung mit der ID "{slug}" angelegt
  validationWarningNameChangeSlug: Wenn du den Namen änderst, funktionieren bestehende Links zur Veranstaltung möglicherweise nicht mehr
  visibility: Sichtbarkeit
  visibilityPrivate: privat
  visibilityPublic: öffentlich
en:
  attendanceType: Attendance type
  description: Invitation text
  end: End
  eventCreate: Create event
  eventCreateSuccess: Event created successfully.
  eventUpdate: Save changes
  stateInfoLocation: A search phrase for Google Maps.
  isInPerson: in person
  isRemote: remote
  maximumInviteeCount: Maximum guest count
  name: Name
  namePlaceholder: Welcome Party
  location: Location
  slug: Slug
  slugPlaceholder: welcome-party
  start: Start
  updated: Updated
  validationExistenceNone: You have already created an event with id "{slug}"
  validationWarningNameChangeSlug: If you change the name, existing links to the event may no longer work
  visibility: Visibility
  visibilityPrivate: private
  visibilityPublic: public
</i18n>
