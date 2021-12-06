<template>
  <Form
    ref="form"
    :form="$v.form"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="form.id ? $t('eventUpdate') : $t('eventCreate')"
    @submit.prevent="submit"
  >
    <FormInput
      class="hidden"
      :error="$v.form.id.$error"
      label-for="input-id"
      title="id"
    >
      <input
        id="input-id"
        v-model.trim="$v.form.id.$model"
        class="form-input"
        type="number"
        placeholder="id"
      />
    </FormInput>
    <FormInput
      :error="$v.form.name.$error"
      label-for="input-name"
      required
      :title="$t('name')"
    >
      <input
        id="input-name"
        v-model.trim="$v.form.name.$model"
        class="form-input"
        type="text"
        :placeholder="$t('namePlaceholder')"
        @input="updateSlug"
      />
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.name"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
        <FormInputError
          :form-input="$v.form.name"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputError>
      </template>
    </FormInput>
    <FormInput
      class="hidden"
      :error="$v.form.slug.$error"
      label-for="input-slug"
      required
      :title="$t('slug')"
    >
      <input
        id="input-slug"
        v-model.trim="$v.form.slug.$model"
        class="form-input"
        type="text"
        :placeholder="$t('slugPlaceholder')"
      />
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.slug"
          validation-property="formatSlug"
        >
          {{ $t('globalValidationFormat') }}
        </FormInputError>
        <FormInputError
          :form-input="$v.form.slug"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
        <FormInputError
          :form-input="$v.form.slug"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form.visibility.$error"
      label-for="input-visibility"
      required
      :title="$t('visibility')"
    >
      <FormRadioButtonGroup
        id="input-visibility"
        v-model="$v.form.visibility.$model"
        class="text-left"
        name="visibility"
        :titles-values="[
          [$t('visibilityPublic'), 'PUBLIC'],
          [$t('visibilityPrivate'), 'PRIVATE'],
        ]"
      />
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.visibility"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form.start.$error"
      label-for="input-start"
      required
      :title="$t('start')"
      :warning="
        !$global.VALIDATION_NOW_OR_FUTURE($moment($v.form.start.$model))
      "
    >
      <Datetime
        v-model="$v.form.start.$model"
        input-class="form-input"
        input-id="input-start"
        type="datetime"
      />
      <template slot="inputWarning">
        <FormInputWarning
          v-if="
            !$global.VALIDATION_NOW_OR_FUTURE($moment($v.form.start.$model))
          "
        >
          {{ $t('globalValidationNowOrFuture') }}
        </FormInputWarning>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form.end.$error"
      label-for="input-end"
      :title="$t('end')"
    >
      <Datetime
        v-model="$v.form.end.$model"
        input-class="form-input"
        input-id="input-end"
        :min-datetime="$v.form.start.$model"
        type="datetime"
      />
    </FormInput>
    <FormInput :title="$t('attendanceType')">
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
      :error="$v.form.location.$error"
      label-for="input-location"
      :title="$t('location')"
    >
      <input
        id="input-location"
        v-model.trim="$v.form.location.$model"
        class="form-input"
        type="text"
      />
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.location"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
      </template>
      <template slot="inputInfo">
        {{ $t('inputInfoLocation') }}
      </template>
    </FormInput>
    <FormInputUrl
      v-if="form.isRemote"
      :form-input="$v.form.url"
      @input="form.url = $event"
    />
    <FormInput
      :error="$v.form.description.$error"
      label-for="input-description"
      :title="$t('description')"
    >
      <TipTap v-model="$v.form.description.$model" class="h-full rounded-b" />
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.description"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form.inviteeCountMaximum.$error"
      label-for="input-invitee-count-maximum'"
      :title="$t('maximumInviteeCount')"
    >
      <input
        id="input-invitee-count-maximum'"
        v-model.trim="$v.form.inviteeCountMaximum.$model"
        class="form-input"
        type="number"
      />
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.inviteeCountMaximum"
          validation-property="maxValue"
        >
          {{ $t('globalValidationMaxValue') }}
        </FormInputError>
        <FormInputError
          :form-input="$v.form.inviteeCountMaximum"
          validation-property="minValue"
        >
          {{ $t('globalValidationMinValue') }}
        </FormInputError>
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

import EVENT_CREATE_MUTATION from '~/gql/mutation/event/eventCreate.gql'
import EVENT_UPDATE_BY_ID_MUTATION from '~/gql/mutation/event/eventUpdateById.gql'
import { Visibility } from '~/types/event'

import { defineComponent } from '#app'

export default defineComponent({
  components: {
    Datetime,
  },
  props: {
    event: {
      default: undefined,
      type: Object,
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
      graphqlError: undefined as any,
    }
  },
  computed: {
    ...mapGetters(['signedInUsername']),
  },
  created() {
    if (this.event) {
      ;[
        'id',
        'authorUsername',
        'description',
        'end',
        'inviteeCountMaximum',
        'isInPerson',
        'isRemote',
        'location',
        'name',
        'slug',
        'start',
        'url',
        'visibility',
      ].forEach(
        (property) =>
          ((this.form as Record<string, any>)[property] = this.event[property])
      )
    }
  },
  methods: {
    async submit() {
      try {
        await this.$global.formPreSubmit(this)
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
              title: this.$t('created'),
            })
            this.$router.push(
              this.localePath(
                `/event/${this.signedInUsername}/${this.form.slug}`
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
            this.$global.VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM
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
            this.$global.VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM
          ),
        },
        name: {
          maxLength: maxLength(
            this.$global.VALIDATION_EVENT_NAME_LENGTH_MAXIMUM
          ),
          required,
        },
        slug: {
          maxLength: maxLength(
            this.$global.VALIDATION_EVENT_SLUG_LENGTH_MAXIMUM
          ),
          required,
          formatSlug: this.$global.VALIDATION_FORMAT_SLUG,
        },
        start: {
          required,
        },
        url: {
          formatUrlHttps: this.$global.VALIDATION_FORMAT_URL_HTTPS,
          maxLength: maxLength(
            this.$global.VALIDATION_EVENT_URL_LENGTH_MAXIMUM
          ),
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
  description: Beschreibung
  edit: Bearbeiten
  end: Ende
  eventCreate: Veranstaltung erstellen
  eventCreateSuccess: Veranstaltung erfolgreich erstellt.
  eventUpdate: Veranstaltung aktualisieren
  inputInfoLocation: Ein Suchbegriff für Google Maps.
  inputInfoUrl: Eine Web-URL für digitale Veranstaltungen.
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
  visibility: Sichtbarkeit
  visibilityPrivate: privat
  visibilityPublic: öffentlich
en:
  attendanceType: Attendance type
  created: Created!
  description: Description
  edit: Edit
  end: End
  eventCreate: Create event
  eventCreateSuccess: Event created successfully.
  eventUpdate: Update event
  inputInfoLocation: A search phrase for Google Maps.
  inputInfoUrl: A web URL for remote events.
  isInPerson: in person
  isRemote: remote
  maximumInviteeCount: Maximum invitee count
  name: Name
  namePlaceholder: Welcome Party
  location: Location
  preview: Preview
  previewNoContent: No content to preview 😕
  slug: Slug
  slugPlaceholder: welcome-party
  start: Start
  updated: Updated
  visibility: Visibility
  visibilityPrivate: private
  visibilityPublic: public
</i18n>
