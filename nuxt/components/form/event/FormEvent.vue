<template>
  <Form
    ref="form"
    :errors="api.errors"
    :form="v$.form"
    :is-form-sent="isFormSent"
    :submit-name="form.id ? t('eventUpdate') : t('eventCreate')"
    @submit.prevent="submit"
  >
    <FormInput
      class="hidden"
      id-label="input-id"
      title="id"
      type="number"
      placeholder="id"
      :value="v$.form.id"
      @input="form.id = $event"
    />
    <FormInput
      id-label="input-name"
      is-required
      is-validatable
      :placeholder="t('namePlaceholder')"
      :title="t('name')"
      type="text"
      :validation-property="v$.form.slug"
      :value="v$.form.name"
      @input="onInputName($event)"
    >
      <template #stateWarning>
        <FormInputStateWarning v-if="event && event.name !== form.name">
          {{ t('validationWarningNameChangeSlug') }}
        </FormInputStateWarning>
      </template>
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.slug"
          is-validation-live
          validation-property="existenceNone"
        >
          {{ t('validationExistenceNone', { slug: v$.form.slug?.$model }) }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.form.name"
          validation-property="maxLength"
        >
          {{ t('globalValidationLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.form.name"
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
      :value="v$.form.slug"
      @input="form.slug = $event"
    >
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.slug"
          validation-property="formatSlug"
        >
          {{ t('globalValidationFormat') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.form.slug"
          validation-property="maxLength"
        >
          {{ t('globalValidationLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.form.slug"
          validation-property="required"
        >
          {{ t('globalValidationRequired') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInput
      v-if="v$.form.visibility"
      id-label="input-visibility"
      is-required
      :title="t('visibility')"
      type="radio"
      :value="v$.form.visibility"
      @input="form.visibility = $event as EventVisibility"
    >
      <FormRadioButtonGroup
        id="input-visibility"
        v-model="v$.form.visibility.$model"
        name="visibility"
        :titles-values="[
          [t('visibilityPublic'), 'PUBLIC'],
          [t('visibilityPrivate'), 'PRIVATE'],
        ]"
      />
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.visibility"
          validation-property="required"
        >
          {{ t('globalValidationRequired') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInput
      v-if="form.visibility === 'PUBLIC'"
      id-label="input-invitee-count-maximum"
      :title="t('maximumInviteeCount')"
      type="number"
      :value="v$.form.inviteeCountMaximum"
      @input="form.inviteeCountMaximum = $event"
    >
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.inviteeCountMaximum"
          validation-property="maxValue"
        >
          {{ t('globalValidationMaxValue') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.form.inviteeCountMaximum"
          validation-property="minValue"
        >
          {{ t('globalValidationMinValue') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInput
      v-if="v$.form.start && v$.form.end"
      id-label="input-start"
      is-required
      :title="t('start')"
      type="datetime-local"
      :value="v$.form.start"
      :warning="isWarningStartPastShown"
      @input="form.start = $event"
    >
      <Datetime
        v-model="v$.form.start.$model"
        :format="formatDateTimeShort"
        input-class="form-input"
        input-id="input-start"
        :max-datetime="v$.form.end.$model"
        :minute-step="5"
        type="datetime"
        :use12-hour="locale === 'en'"
      />
      <template #stateWarning>
        <FormInputStateWarning v-if="isWarningStartPastShown">
          {{ t('globalValidationNowOrFuture') }}
        </FormInputStateWarning>
      </template>
    </FormInput>
    <FormInput
      v-if="v$.form.end && v$.form.start"
      id-label="input-end"
      :title="t('end')"
      type="datetime-local"
      :value="v$.form.end"
      @input="form.end = $event"
      @icon="form.end = ''"
    >
      <Datetime
        v-model="v$.form.end.$model"
        :format="formatDateTimeShort"
        :input-class="[
          'form-input',
          ...(!!v$.form.end.$model ? ['rounded-r-none'] : []),
        ]"
        input-id="input-end"
        :min-datetime="v$.form.start.$model"
        :minute-step="5"
        type="datetime"
        :use12-hour="locale === 'en'"
      />
      <template v-if="!!v$.form.end.$model" #icon>
        <IconX />
      </template>
    </FormInput>
    <FormInput
      id-label="input-attendance-type"
      :title="t('attendanceType')"
      type="checkbox"
    >
      <FormCheckbox
        v-if="v$.form.isInPerson"
        form-key="is-in-person"
        :value="v$.form.isInPerson.$model"
        @change="form.isInPerson = $event"
      >
        {{ t('isInPerson') }}
      </FormCheckbox>
      <FormCheckbox
        v-if="v$.form.isRemote"
        form-key="is-remote"
        :value="v$.form.isRemote.$model"
        @change="form.isRemote = $event"
      >
        {{ t('isRemote') }}
      </FormCheckbox>
    </FormInput>
    <FormInput
      v-if="form.isInPerson"
      id-label="input-location"
      :placeholder="t('globalPlaceholderAddress').replace('\n', ' ')"
      :title="t('location')"
      type="text"
      :value="v$.form.location"
      @input="form.location = $event"
    >
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.location"
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
      v-if="form.isRemote"
      :form-input="v$.form.url"
      @input="form.url = $event"
    />
    <FormInput
      id-label="input-description"
      :title="t('description')"
      type="tiptap"
      :value="v$.form.description"
      @input="form.description = $event"
    >
      <client-only v-if="v$.form.description">
        <TipTap v-model.trim="v$.form.description.$model" />
      </client-only>
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.description"
          validation-property="maxLength"
        >
          {{ t('globalValidationLength') }}
        </FormInputStateError>
      </template>
    </FormInput>
  </Form>
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
import consola from 'consola'
import { Datetime } from 'vue-datetime'
import { DateTime, Settings } from 'luxon'
import slugify from 'slugify'
import Swal from 'sweetalert2'

import { Event } from '~/types/event'
import {
  formPreSubmit,
  validateEventSlug,
  VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM,
  VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM,
  VALIDATION_EVENT_NAME_LENGTH_MAXIMUM,
  VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM,
  VALIDATION_EVENT_URL_LENGTH_MAXIMUM,
  VALIDATION_FORMAT_SLUG,
  VALIDATION_FORMAT_URL_HTTPS,
  VALIDATION_NOW_OR_FUTURE,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import {
  EventVisibility,
  useCreateEventMutation,
  useUpdateEventByIdMutation,
} from '~/gql/generated'
import { useMaevsiStore } from '~/store'

export interface Props {
  event: Event | undefined
}
const props = withDefaults(defineProps<Props>(), {
  event: undefined,
})

// uses
const { $moment } = useNuxtApp()
const localePath = useLocalePath()
const { locale, t } = useI18n()
const store = useMaevsiStore()
const createEventMutation = useCreateEventMutation()
const updateEventMutation = useUpdateEventByIdMutation()

// api data
const api = computed(() => {
  return {
    data: {},
    ...getApiMeta([createEventMutation, updateEventMutation]),
  }
})

// data
const form = reactive({
  id: ref<string>(),
  authorUsername: ref<string>(),
  description: ref<string>(),
  end: ref<string>(),
  inviteeCountMaximum: ref<string>(),
  isInPerson: ref(false),
  isRemote: ref(false),
  location: ref<string>(),
  name: ref<string>(),
  slug: ref<string>(),
  start: ref(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
  ), // Must be initialized, otherwise yields an error instantly: https://github.com/mariomka/vue-datetime/issues/177
  url: ref<string>(),
  visibility: ref<EventVisibility>(),
})
const formatDateTimeShort = ref(DateTime.DATETIME_SHORT)
const isFormSent = ref(false)
const signedInUsername = ref(store.signedInUsername)

// methods
function onInputName($event: any) {
  form.name = $event
  updateSlug()
}
async function submit() {
  try {
    await formPreSubmit({ api }, v$, isFormSent)
  } catch (error) {
    consola.debug(error)
    return
  }

  if (form.id) {
    // Edit
    // TODO: extract object
    const result = await updateEventMutation.executeMutation({
      id: form.id,
      eventPatch: {
        authorUsername: signedInUsername.value,
        description: form.description,
        end: form.end !== '' ? form.end : undefined,
        inviteeCountMaximum:
          form.inviteeCountMaximum && form.inviteeCountMaximum !== ''
            ? +form.inviteeCountMaximum
            : undefined,
        isInPerson: form.isInPerson,
        isRemote: form.isRemote,
        location: form.location !== '' ? form.location : undefined,
        name: form.name,
        slug: form.slug,
        start: form.start,
        url: form.url !== '' ? form.url : undefined,
        visibility: form.visibility || EventVisibility.Private,
      },
    })

    if (result.error) {
      api.value.errors.push(result.error)
      consola.error(result.error)
    }

    if (!result.data) {
      return
    }

    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: t('updated'),
    })
  } else {
    // Add

    if (!form.name) throw new Error('Name is not set!')
    if (!form.slug) throw new Error('Slug is not set!')

    const result = await createEventMutation.executeMutation({
      createEventInput: {
        event: {
          authorUsername: signedInUsername.value || '',
          description: form.description,
          end: form.end !== '' ? form.end : undefined,
          inviteeCountMaximum:
            form.inviteeCountMaximum && form.inviteeCountMaximum !== ''
              ? +form.inviteeCountMaximum
              : undefined,
          isInPerson: form.isInPerson,
          isRemote: form.isRemote,
          location: form.location !== '' ? form.location : undefined,
          name: form.name,
          slug: form.slug,
          start: form.start,
          url: form.url !== '' ? form.url : undefined,
          visibility: form.visibility || EventVisibility.Private,
        },
      },
    })

    if (result.error) {
      api.value.errors.push(result.error)
      consola.error(result.error)
    }

    if (!result.data) {
      return
    }

    Swal.fire({
      icon: 'success',
      text: t('eventCreateSuccess') as string,
      timer: 3000,
      timerProgressBar: true,
      title: t('created'),
    }).then(
      async () =>
        await navigateTo(
          localePath(`/event/${signedInUsername.value}/${form.slug}`)
        )
    )
  }
}
function updateSlug() {
  form.slug = slugify(form.name ?? '', {
    lower: true,
    strict: true,
  })
}

// computations
const isWarningStartPastShown = computed(
  () => !VALIDATION_NOW_OR_FUTURE($moment(v$.value.form.start.$model))
)

// initialization
if (props.event) {
  for (const [k, v] of Object.entries(props.event)) {
    ;(form as Record<string, any>)[k] = v
  }
}

Settings.defaultLocale = locale.value

// vuelidate
const rules = {
  form: {
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
  },
}
const v$ = useVuelidate(rules, { form })
</script>

<i18n lang="yml">
de:
  attendanceType: Anwesenheitstyp
  created: Erstellt!
  description: Einladungstext
  end: Ende
  eventCreate: Veranstaltung erstellen
  eventCreateSuccess: Veranstaltung erfolgreich erstellt.
  eventUpdate: Änderungen speichern
  stateInfoLocation: Ein Suchbegriff für Google Maps.
  stateInfoUrl: Eine Web-URL für digitale Veranstaltungen.
  isInPerson: vor Ort
  isRemote: digital
  maximumInviteeCount: Maximale Gästezahl
  name: Name
  namePlaceholder: Willkommensfeier
  location: Ort
  preview: Vorschau
  previewNoContent: Kein Inhalt für die Vorschau 😕
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
  created: Created!
  description: Invitation text
  end: End
  eventCreate: Create event
  eventCreateSuccess: Event created successfully.
  eventUpdate: Save changes
  stateInfoLocation: A search phrase for Google Maps.
  stateInfoUrl: A web URL for remote events.
  isInPerson: in person
  isRemote: remote
  maximumInviteeCount: Maximum guest count
  name: Name
  namePlaceholder: Welcome Party
  location: Location
  preview: Preview
  previewNoContent: No content to preview 😕
  slug: Slug
  slugPlaceholder: welcome-party
  start: Start
  updated: Updated
  validationExistenceNone: You've already created an event with id "{slug}"
  validationWarningNameChangeSlug: If you change the name, existing links to the event may no longer work
  visibility: Visibility
  visibilityPrivate: private
  visibilityPublic: public
</i18n>
