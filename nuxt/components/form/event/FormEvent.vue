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
      <template slot="stateWarning">
        <FormInputStateWarning v-if="event && event.name !== form.name">
          {{ t('validationWarningNameChangeSlug') }}
        </FormInputStateWarning>
      </template>
      <template slot="stateError">
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
      <template slot="stateError">
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
      @input="form.visibility = $event"
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
      <template slot="stateError">
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
      <template slot="stateError">
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
      <template slot="stateWarning">
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
      <template v-if="!!v$.form.end.$model" slot="icon">
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
      <template slot="stateError">
        <FormInputStateError
          :form-input="v$.form.location"
          validation-property="maxLength"
        >
          {{ t('globalValidationLength') }}
        </FormInputStateError>
      </template>
      <template slot="stateInfo">
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
      <template slot="stateError">
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

<script lang="ts">
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
import { computed, defineComponent, PropType, reactive, toRef } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNuxtApp, navigateTo } from '#app'

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

export default defineComponent({
  components: {
    Datetime,
  },
  props: {
    event: {
      default: undefined,
      type: Object as PropType<Event | undefined>,
    },
  },
  setup(props) {
    const { $moment } = useNuxtApp()
    const localePath = useLocalePath()
    const { locale, t } = useI18n()
    const store = useMaevsiStore()
    const createEventMutation = useCreateEventMutation()
    const updateEventMutation = useUpdateEventByIdMutation()

    const apiData = {
      api: computed(() => {
        return {
          data: {},
          ...getApiMeta([createEventMutation, updateEventMutation]),
        }
      }),
    }
    const data = reactive({
      form: {
        id: '',
        authorUsername: '',
        description: '',
        end: '',
        inviteeCountMaximum: '',
        isInPerson: false,
        isRemote: false,
        location: '',
        name: '',
        slug: '',
        start: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(), // Must be initialized, otherwise yields an error instantly: https://github.com/mariomka/vue-datetime/issues/177
        url: '',
        visibility: undefined as EventVisibility | undefined,
      },
      formatDateTimeShort: DateTime.DATETIME_SHORT,
      isFormSent: false,
      locale,
      signedInUsername: store.signedInUsername,
    })
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
            validateEventSlug(
              store.signedInUsername || '',
              true,
              props.event?.slug
            )
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
    const v$ = useVuelidate(rules, data)
    const methods = {
      localePath,
      onInputName($event: any) {
        data.form.name = $event
        methods.updateSlug()
      },
      async submit() {
        try {
          await formPreSubmit(apiData, v$, toRef(data, 'isFormSent'))
        } catch (error) {
          consola.debug(error)
          return
        }

        if (data.form.id) {
          // Edit
          const result = await updateEventMutation.executeMutation({
            id: data.form.id,
            eventPatch: {
              authorUsername: data.signedInUsername,
              description: data.form.description,
              end: data.form.end !== '' ? data.form.end : undefined,
              inviteeCountMaximum:
                data.form.inviteeCountMaximum &&
                data.form.inviteeCountMaximum !== ''
                  ? +data.form.inviteeCountMaximum
                  : undefined,
              isInPerson: data.form.isInPerson,
              isRemote: data.form.isRemote,
              location:
                data.form.location !== '' ? data.form.location : undefined,
              name: data.form.name,
              slug: data.form.slug,
              start: data.form.start,
              url: data.form.url !== '' ? data.form.url : undefined,
              visibility: data.form.visibility || EventVisibility.Private,
            },
          })

          if (result.error) {
            apiData.api.value.errors.push(result.error)
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
          const result = await createEventMutation.executeMutation({
            createEventInput: {
              event: {
                authorUsername: data.signedInUsername || '',
                description: data.form.description,
                end: data.form.end !== '' ? data.form.end : undefined,
                inviteeCountMaximum:
                  data.form.inviteeCountMaximum &&
                  data.form.inviteeCountMaximum !== ''
                    ? +data.form.inviteeCountMaximum
                    : undefined,
                isInPerson: data.form.isInPerson,
                isRemote: data.form.isRemote,
                location:
                  data.form.location !== '' ? data.form.location : undefined,
                name: data.form.name,
                slug: data.form.slug,
                start: data.form.start,
                url: data.form.url !== '' ? data.form.url : undefined,
                visibility: data.form.visibility || EventVisibility.Private,
              },
            },
          })

          if (result.error) {
            apiData.api.value.errors.push(result.error)
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
                localePath(`/event/${data.signedInUsername}/${data.form.slug}`)
              )
          )
        }
      },
      t,
      updateSlug() {
        data.form.slug = slugify(data.form.name ?? '', {
          lower: true,
          strict: true,
        })
      },
    }
    const computations = {
      isWarningStartPastShown: computed(
        () => !VALIDATION_NOW_OR_FUTURE($moment(v$.value.form.start.$model))
      ),
    }

    if (props.event) {
      for (const [k, v] of Object.entries(props.event)) {
        ;(data.form as Record<string, any>)[k] = v
      }
    }

    Settings.defaultLocale = locale.value

    return {
      ...apiData,
      ...data,
      ...methods,
      ...computations,
      v$,
    }
  },
})
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
