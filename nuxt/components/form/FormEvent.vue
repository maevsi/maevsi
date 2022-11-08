<template>
  <div>
    <Form
      ref="form"
      :errors="api.errors"
      :form="v$.form"
      :is-form-sent="isFormSent"
      :submit-name="v$.form.id.$model ? t('eventUpdate') : t('eventCreate')"
      @submit.prevent="submit"
    >
      <FormInput
        class="hidden"
        id-label="input-id"
        title="id"
        type="number"
        placeholder="id"
        :value="v$.form.id"
        @input="v$.form.id.$model = $event"
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
        @input="v$.form.slug.$model = $event"
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
        @input="v$.form.visibility.$model = $event as EventVisibility"
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
        v-if="v$.form.visibility.$model === 'PUBLIC'"
        id-label="input-invitee-count-maximum"
        :title="t('maximumInviteeCount')"
        type="number"
        :value="v$.form.inviteeCountMaximum"
        @input="v$.form.inviteeCountMaximum.$model = $event"
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
        id-label="input-start"
        is-readonly
        :placeholder="dateTimeFormatter(new Date().toISOString())"
        :title="t('start')"
        type="text"
        :value="v$.form.start"
        :value-formatter="dateTimeFormatter"
        :warning="isWarningStartPastShown"
        @click="store.modalAdd({ id: 'ModalDateTimeStart' })"
      >
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
        :value="v$.form.end"
        :value-formatter="dateTimeFormatter"
        @click="store.modalAdd({ id: 'ModalDateTimeEnd' })"
        @icon="v$.form.end.$model = undefined"
      >
        <template v-if="v$.form.end.$model" #icon>
          <IconX />
        </template>
      </FormInput>
      <FormInput :title="t('attendanceType')" type="checkbox">
        <FormCheckbox
          form-key="is-in-person"
          :value="v$.form.isInPerson.$model"
          @change="v$.form.isInPerson.$model = $event"
        >
          {{ t('isInPerson') }}
        </FormCheckbox>
        <FormCheckbox
          form-key="is-remote"
          :value="v$.form.isRemote.$model"
          @change="v$.form.isRemote.$model = $event"
        >
          {{ t('isRemote') }}
        </FormCheckbox>
      </FormInput>
      <FormInput
        v-if="v$.form.isInPerson.$model"
        id-label="input-location"
        :placeholder="t('globalPlaceholderAddress').replace('\n', ' ')"
        :title="t('location')"
        type="text"
        :value="v$.form.location"
        @input="v$.form.location.$model = $event"
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
        v-if="v$.form.isRemote.$model"
        :form-input="v$.form.url"
        @input="v$.form.url.$model = $event"
      />
      <FormInput
        :title="t('description')"
        type="tiptap"
        :value="v$.form.description"
        @input="v$.form.description.$model = $event"
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
    <Modal id="ModalDateTimeStart">
      <client-only>
        <div class="flex justify-center">
          <v-date-picker
            v-model="v$.form.start.$model"
            :is24hr="$i18n.locale !== 'en'"
            is-dark
            :locale="$i18n.locale"
            :masks="{ input: 'YYYY-MM-DD h:mm A' }"
            :max-date="v$.form.end.$model"
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
            v-model="v$.form.end.$model"
            :is24hr="$i18n.locale !== 'en'"
            is-dark
            :locale="$i18n.locale"
            :masks="{ input: 'YYYY-MM-DD h:mm A' }"
            :min-date="v$.form.start.$model"
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
import consola from 'consola'
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
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import {
  EventVisibility,
  useCreateEventMutation,
  useUpdateEventByIdMutation,
} from '~/gql/generated'
import { useMaevsiStore } from '~/store'

export interface Props {
  event?: Event
}
const props = withDefaults(defineProps<Props>(), {
  event: undefined,
})

const localePath = useLocalePath()
const { locale, t } = useI18n()
const store = useMaevsiStore()
const createEventMutation = useCreateEventMutation()
const updateEventMutation = useUpdateEventByIdMutation()

// api data
const api = computed(() => ({
  data: {},
  ...getApiMeta([createEventMutation, updateEventMutation]),
}))

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
function dateTimeFormatter(x?: string) {
  return x
    ? new Date(x).toLocaleString(locale.value, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : undefined
}
function onInputName($event: any) {
  v$.value.form.name.$model = $event
  updateSlug()
}
async function submit() {
  try {
    await formPreSubmit(api, v$, isFormSent)
  } catch (error) {
    consola.error(error)
    return
  }

  if (form.id) {
    // Edit
    // TODO: extract object
    const result = await updateEventMutation.executeMutation({
      id: form.id,
      eventPatch: {
        authorUsername: signedInUsername.value,
        description: form.description || null,
        end: form.end || null,
        inviteeCountMaximum: form.inviteeCountMaximum
          ? +form.inviteeCountMaximum
          : undefined,
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

    if (!signedInUsername.value) throw new Error('Author username is not set!')
    if (!form.name) throw new Error('Name is not set!')
    if (!form.slug) throw new Error('Slug is not set!')
    if (!form.visibility) throw new Error('Visibility is not set!')

    const result = await createEventMutation.executeMutation({
      createEventInput: {
        event: {
          authorUsername: signedInUsername.value,
          description: form.description || null,
          end: form.end || null,
          inviteeCountMaximum: form.inviteeCountMaximum
            ? +form.inviteeCountMaximum
            : undefined,
          isInPerson: form.isInPerson,
          isRemote: form.isRemote,
          location: form.location || null,
          name: form.name,
          slug: form.slug,
          start: form.start || null,
          url: form.url || null,
          visibility: form.visibility,
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
function updateForm(data: Event) {
  if (!data) return

  for (const [k, v] of Object.entries(data)) {
    ;(form as Record<string, any>)[k] = v
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
  () => !!form.start && new Date(form.start) < new Date()
)

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
  validationExistenceNone: You have already created an event with id "{slug}"
  validationWarningNameChangeSlug: If you change the name, existing links to the event may no longer work
  visibility: Visibility
  visibilityPrivate: private
  visibilityPublic: public
</i18n>
