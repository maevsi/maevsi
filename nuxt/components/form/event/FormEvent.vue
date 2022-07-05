<template>
  <Form
    ref="form"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
    :form="$v.form"
    :form-sent="form.sent"
    :submit-name="form.id ? $t('eventUpdate') : $t('eventCreate')"
    @submit.prevent="submit"
  >
    <FormInput
      class="hidden"
      id-label="input-id"
      title="id"
      type="number"
      placeholder="id"
      :value="$v.form.id"
      @input="form.id = $event"
    />
    <FormInput
      id-label="input-name"
      is-required
      is-validatable
      :placeholder="$t('namePlaceholder')"
      :title="$t('name')"
      type="text"
      :validation-property="$v.form.slug"
      :value="$v.form.name"
      @input="
        form.name = $event
        updateSlug()
      "
    >
      <template slot="stateInfo">
        <FormInputStateInfo>
          {{
            $t('slugInfo', {
              slug: $v.form.slug.$model || $t('slugPlaceholder'),
            })
          }}
        </FormInputStateInfo>
      </template>
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.slug"
          is-validation-live
          validation-property="existenceNone"
        >
          {{ $t('globalValidationExistenceNone') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="$v.form.name"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="$v.form.name"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInput
      class="hidden"
      id-label="input-slug"
      is-required
      :placeholder="$t('slugPlaceholder')"
      :title="$t('slug')"
      type="text"
      :value="$v.form.slug"
      @input="form.slug = $event"
    >
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.slug"
          validation-property="formatSlug"
        >
          {{ $t('globalValidationFormat') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="$v.form.slug"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="$v.form.slug"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInput
      id-label="input-visibility"
      is-required
      :title="$t('visibility')"
      type="radio"
      :value="$v.form.visibility"
      @input="form.visibility = $event"
    >
      <FormRadioButtonGroup
        id="input-visibility"
        v-model="$v.form.visibility.$model"
        name="visibility"
        :titles-values="[
          [$t('visibilityPublic'), 'PUBLIC'],
          [$t('visibilityPrivate'), 'PRIVATE'],
        ]"
      />
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.visibility"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInput
      id-label="input-start"
      is-required
      :title="$t('start')"
      type="datetime-local"
      :value="$v.form.start"
      :warning="!$util.VALIDATION_NOW_OR_FUTURE($moment($v.form.start.$model))"
      @input="form.start = $event"
    >
      <Datetime
        v-model="$v.form.start.$model"
        input-class="form-input"
        input-id="input-start"
        :max-datetime="$v.form.end.$model"
        :minute-step="5"
        type="datetime"
      />
      <template slot="stateWarning">
        <FormInputStateWarning
          v-if="!$util.VALIDATION_NOW_OR_FUTURE($moment($v.form.start.$model))"
        >
          {{ $t('globalValidationNowOrFuture') }}
        </FormInputStateWarning>
      </template>
    </FormInput>
    <FormInput
      id-label="input-end"
      :title="$t('end')"
      type="datetime-local"
      :value="$v.form.end"
      @input="form.end = $event"
      @click="$v.form.end.$model = undefined"
    >
      <Datetime
        v-model="$v.form.end.$model"
        :input-class="[
          'form-input',
          ...(!!$v.form.end.$model ? ['rounded-r-none'] : []),
        ]"
        input-id="input-end"
        :min-datetime="$v.form.start.$model"
        :minute-step="5"
        type="datetime"
      />
      <template v-if="!!$v.form.end.$model" slot="icon">
        <IconX />
      </template>
    </FormInput>
    <FormInput
      id-label="input-attendance-type"
      :title="$t('attendanceType')"
      type="checkbox"
    >
      <FormCheckbox
        form-key="is-in-person"
        :value="$v.form.isInPerson.$model"
        @change="form.isInPerson = $event"
      >
        {{ $t('isInPerson') }}
      </FormCheckbox>
      <FormCheckbox
        form-key="is-remote"
        :value="$v.form.isRemote.$model"
        @change="form.isRemote = $event"
      >
        {{ $t('isRemote') }}
      </FormCheckbox>
    </FormInput>
    <FormInput
      v-if="form.isInPerson"
      id-label="input-location"
      :placeholder="$t('locationPlaceholder')"
      :title="$t('location')"
      type="text"
      :value="$v.form.location"
      @input="form.location = $event"
    >
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.location"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputStateError>
      </template>
      <template slot="stateInfo">
        <FormInputStateInfo>
          {{ $t('stateInfoLocation') }}
        </FormInputStateInfo>
      </template>
    </FormInput>
    <FormInputUrl
      v-if="form.isRemote"
      :form-input="$v.form.url"
      @input="form.url = $event"
    />
    <FormInput
      id-label="input-description"
      :title="$t('description')"
      type="tiptap"
      :value="$v.form.description"
      @input="form.description = $event"
    >
      <TipTap
        v-model.trim="$v.form.description.$model"
        class="h-full rounded-b"
      />
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.description"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInput
      id-label="input-invitee-count-maximum"
      :title="$t('maximumInviteeCount')"
      type="number"
      :value="$v.form.inviteeCountMaximum"
      @input="form.inviteeCountMaximum = $event"
    >
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.inviteeCountMaximum"
          validation-property="maxValue"
        >
          {{ $t('globalValidationMaxValue') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="$v.form.inviteeCountMaximum"
          validation-property="minValue"
        >
          {{ $t('globalValidationMinValue') }}
        </FormInputStateError>
      </template>
    </FormInput>
  </Form>
</template>

<script lang="ts">
import consola from 'consola'
import { Datetime } from 'vue-datetime'
import {
  maxLength,
  maxValue,
  minValue,
  required,
} from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

import { defineComponent, PropType } from '#app'
import EVENT_CREATE_MUTATION from '~/gql/mutation/event/eventCreate.gql'
import EVENT_UPDATE_BY_ID_MUTATION from '~/gql/mutation/event/eventUpdateById.gql'
import { Event, Visibility } from '~/types/event'

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
  data() {
    return {
      form: {
        sent: false,
        id: undefined as string | undefined,
        authorUsername: undefined as string | undefined,
        description: undefined as string | undefined,
        end: undefined as string | undefined,
        inviteeCountMaximum: undefined as string | undefined,
        isInPerson: undefined as boolean | undefined,
        isRemote: undefined as boolean | undefined,
        location: undefined as string | undefined,
        name: undefined as string | undefined,
        slug: undefined as string | undefined,
        start: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(), // Must be initialized, otherwise yields an error instantly: https://github.com/mariomka/vue-datetime/issues/177
        url: undefined as string | undefined,
        visibility: undefined as Visibility | undefined,
      },
      graphqlError: undefined as Error | undefined,
    }
  },
  computed: {
    ...mapGetters(['signedInUsername']),
  },
  created() {
    if (this.event) {
      for (const [k, v] of Object.entries(this.event)) {
        ;(this.form as Record<string, any>)[k] = v
      }
    }
  },
  methods: {
    async submit() {
      try {
        await this.$util.formPreSubmit(this)
      } catch (error) {
        return
      }

      if (this.form.id) {
        // Edit
        this.$apollo
          .mutate({
            mutation: EVENT_UPDATE_BY_ID_MUTATION,
            variables: {
              id: this.form.id,
              eventPatch: {
                authorUsername: this.signedInUsername,
                description: this.form.description,
                end: this.form.end !== '' ? this.form.end : null,
                inviteeCountMaximum:
                  this.form.inviteeCountMaximum &&
                  this.form.inviteeCountMaximum !== ''
                    ? +this.form.inviteeCountMaximum
                    : null,
                isInPerson: this.form.isInPerson,
                isRemote: this.form.isRemote,
                location: this.form.location !== '' ? this.form.location : null,
                name: this.form.name,
                slug: this.form.slug,
                start: this.form.start,
                url: this.form.url !== '' ? this.form.url : null,
                visibility: this.form.visibility,
              },
            },
          })
          .then(() => {
            this.$swal({
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              title: this.$t('updated'),
            })
          })
          .catch((reason) => {
            this.graphqlError = reason
            consola.error(reason)
          })
      } else {
        // Add
        this.$apollo
          .mutate({
            mutation: EVENT_CREATE_MUTATION,
            variables: {
              createEventInput: {
                event: {
                  authorUsername: this.signedInUsername,
                  description: this.form.description,
                  end: this.form.end !== '' ? this.form.end : null,
                  inviteeCountMaximum:
                    this.form.inviteeCountMaximum &&
                    this.form.inviteeCountMaximum !== ''
                      ? +this.form.inviteeCountMaximum
                      : null,
                  isInPerson: this.form.isInPerson,
                  isRemote: this.form.isRemote,
                  location:
                    this.form.location !== '' ? this.form.location : null,
                  name: this.form.name,
                  slug: this.form.slug,
                  start: this.form.start,
                  url: this.form.url !== '' ? this.form.url : null,
                  visibility: this.form.visibility,
                },
              },
            },
          })
          .then(() => {
            this.$swal({
              icon: 'success',
              text: this.$t('eventCreateSuccess') as string,
              timer: 3000,
              timerProgressBar: true,
              title: this.$t('created'),
            }).then(() =>
              this.$router.push(
                this.localePath(
                  `/event/${this.signedInUsername}/${this.form.slug}`
                )
              )
            )
          })
          .catch((reason) => {
            this.graphqlError = reason
            consola.error(reason)
          })
      }
    },
    updateSlug() {
      this.form.slug = this.$slugify(this.form.name ?? '', {
        lower: true,
        strict: true,
      })
    },
  },
  validations() {
    return {
      form: {
        id: {},
        authorUsername: {},
        description: {
          maxLength: maxLength(
            this.$util.VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM
          ),
        },
        end: {},
        inviteeCountMaximum: {
          maxValue: maxValue(Math.pow(2, 31) - 1), // PostgrSQL's positive end of range for integers.
          minValue: minValue(1),
        },
        isInPerson: {},
        isRemote: {},
        location: {
          maxLength: maxLength(
            this.$util.VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM
          ),
        },
        name: {
          maxLength: maxLength(this.$util.VALIDATION_EVENT_NAME_LENGTH_MAXIMUM),
          required,
        },
        slug: {
          existenceNone: this.$util.validateEventSlug(
            this.$apollo as any,
            this.signedInUsername,
            true,
            (this.event as Event | undefined)?.slug
          ),
          maxLength: maxLength(this.$util.VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM),
          required,
          formatSlug: this.$util.VALIDATION_FORMAT_SLUG,
        },
        start: {
          required,
        },
        url: {
          formatUrlHttps: this.$util.VALIDATION_FORMAT_URL_HTTPS,
          maxLength: maxLength(this.$util.VALIDATION_EVENT_URL_LENGTH_MAXIMUM),
        },
        visibility: {
          required,
        },
      },
    }
  },
})
</script>

<i18n lang="yml">
de:
  attendanceType: Anwesenheitstyp
  created: Erstellt!
  description: Einladungstext
  edit: Bearbeiten
  end: Ende
  eventCreate: Veranstaltung erstellen
  eventCreateSuccess: Veranstaltung erfolgreich erstellt.
  eventUpdate: Veranstaltung aktualisieren
  stateInfoLocation: Ein Suchbegriff für Google Maps.
  stateInfoUrl: Eine Web-URL für digitale Veranstaltungen.
  isInPerson: vor Ort
  isRemote: digital
  locationPlaceholder: Veranstaltungsstraße 1, 12345 Gaststadt
  maximumInviteeCount: Maximale Gästezahl
  name: Name
  namePlaceholder: Willkommensfeier
  location: Ort
  preview: Vorschau
  previewNoContent: Kein Inhalt für die Vorschau 😕
  slug: Slug
  slugInfo: Deine Veranstaltung hat die ID '{slug}'.
  slugPlaceholder: willkommensfeier
  start: Beginn
  updated: Aktualisiert
  visibility: Sichtbarkeit
  visibilityPrivate: privat
  visibilityPublic: öffentlich
en:
  attendanceType: Attendance type
  created: Created!
  description: Invitation text
  edit: Edit
  end: End
  eventCreate: Create event
  eventCreateSuccess: Event created successfully.
  eventUpdate: Update event
  stateInfoLocation: A search phrase for Google Maps.
  stateInfoUrl: A web URL for remote events.
  isInPerson: in person
  isRemote: remote
  locationPlaceholder: Eventstreet 1, 12345 Guestcity
  maximumInviteeCount: Maximum invitee count
  name: Name
  namePlaceholder: Welcome Party
  location: Location
  preview: Preview
  previewNoContent: No content to preview 😕
  slug: Slug
  slugInfo: Your event has the id "{slug}".
  slugPlaceholder: welcome-party
  start: Start
  updated: Updated
  visibility: Visibility
  visibilityPrivate: private
  visibilityPublic: public
</i18n>
