<template>
  <Form
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit.prevent="submit"
  >
    <FormInput
      :error="$v.form['name'].$error"
      label-for="input-name"
      required
      :title="$t('name')"
    >
      <input
        id="input-name"
        v-model.trim="$v.form['name'].$model"
        class="form-input"
        type="text"
        :placeholder="$t('namePlaceholder')"
        @input="updateSlug"
      />
      <template slot="inputError">
        <FormError
          :validation-object="$v.form['name']"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormError>
        <FormError
          :validation-object="$v.form['name']"
          validation-property="maxLength"
        >
          {{ $t('globalValidationTooLong') }}
        </FormError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form['slug'].$error"
      label-for="input-slug"
      required
      :title="$t('slug')"
    >
      <input
        id="input-slug"
        v-model.trim="$v.form['slug'].$model"
        class="form-input"
        type="text"
        :placeholder="$t('slugPlaceholder')"
      />
      <template slot="inputError">
        <FormError
          :validation-object="$v.form['slug']"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormError>
        <FormError
          :validation-object="$v.form['slug']"
          validation-property="maxLength"
        >
          {{ $t('globalValidationTooLong') }}
        </FormError>
        <FormError
          :validation-object="$v.form['slug']"
          validation-property="formatSlug"
        >
          {{ $t('globalValidationFormatIncorrect') }}
        </FormError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form['visibility'].$error"
      label-for="input-visibility"
      required
      :title="$t('visibility')"
    >
      <FormRadioButtonGroup
        id="input-visibility"
        class="text-left"
        name="visibility"
        :titles-values="[
          [$t('visibilityPublic'), 'PUBLIC'],
          [$t('visibilityPrivate'), 'PRIVATE'],
        ]"
        @change="$v.form['visibility'].$model = $event"
      />
      <template slot="inputError">
        <FormError
          :validation-object="$v.form['visibility']"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form['start'].$error"
      label-for="input-start"
      required
      :title="$t('start')"
    >
      <Datetime
        v-model="$v.form['start'].$model"
        input-class="form-input"
        input-id="input-start"
        type="datetime"
      />
    </FormInput>
    <FormInput
      :error="$v.form['end'].$error"
      label-for="input-end"
      :title="$t('end')"
    >
      <Datetime
        v-model="$v.form['end'].$model"
        input-class="form-input"
        input-id="input-end"
        :min-datetime="$v.form['start'].$model"
        type="datetime"
      />
    </FormInput>
    <FormInput :title="$t('attendanceType')">
      <FormCheckbox
        form-key="is-in-person"
        :value="$v.form['is-in-person'].$model"
        @change="$v.form['is-in-person'].$model = $event"
      >
        {{ $t('isInPerson') }}
      </FormCheckbox>
      <FormCheckbox
        form-key="is-remote"
        :value="$v.form['is-remote'].$model"
        @change="$v.form['is-remote'].$model = $event"
      >
        {{ $t('isRemote') }}
      </FormCheckbox>
    </FormInput>
    <FormInput
      :error="$v.form['location'].$error"
      label-for="input-location"
      :title="$t('location')"
    >
      <input
        id="input-location"
        v-model.trim="$v.form['location'].$model"
        class="form-input"
        type="text"
      />
      <template slot="inputError">
        <FormError
          :validation-object="$v.form['location']"
          validation-property="maxLength"
        >
          {{ $t('globalValidationTooLong') }}
        </FormError>
      </template>
      <template slot="inputInfo">
        {{ $t('inputLocationInfo') }}
      </template>
    </FormInput>
    <FormInput
      :error="$v.form['description'].$error"
      label-for="input-description"
      :title="$t('description')"
    >
      <TabFlip
        dark
        :tabs="[
          ['edit', $t('edit')],
          ['preview', $t('preview')],
        ]"
      >
        <template slot="front">
          <textarea
            id="input-description"
            v-model.trim="$v.form['description'].$model"
            class="form-input h-full rounded-t-none"
          />
        </template>
        <template slot="back">
          <div
            class="border-2 border-t-0 card border-gray-200 h-full rounded-b"
          >
            <vue-markdown
              v-if="$v.form['description'].$model"
              :anchor-attributes="{ rel: 'nofollow noopener noreferrer' }"
              class="description h-full maevsi-prose rounded-t-none"
              :source="$v.form['description'].$model"
            />
            <div v-else class="h-full text-center">
              {{ $t('previewNoContent') }}
            </div>
          </div>
        </template>
      </TabFlip>
      <template slot="inputError">
        <FormError
          :validation-object="$v.form['description']"
          validation-property="maxLength"
        >
          {{ $t('globalValidationTooLong') }}
        </FormError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form['invitee-count-maximum'].$error"
      label-for="input-invitee-count-maximum'"
      :title="$t('maximumInviteeCount')"
    >
      <input
        id="input-invitee-count-maximum'"
        v-model.trim="$v.form['invitee-count-maximum'].$model"
        class="form-input"
        type="number"
      />
      <template slot="inputError">
        <FormError
          :validation-object="$v.form['invitee-count-maximum']"
          validation-property="minValue"
        >
          {{ $t('globalValidationMinValue') }}
        </FormError>
      </template>
    </FormInput>
    <div class="flex flex-col items-center justify-between">
      <ButtonSubmit
        :error-message="graphqlErrorMessage"
        :form="$v.form"
        :form-sent="form.sent"
      >
        {{ $t('eventCreate') }}
      </ButtonSubmit>
    </div>
    <CardAlert
      class="mt-4"
      :error-message="graphqlErrorMessage"
      :validation-object="$v.form"
    />
  </Form>
</template>

<script>
import { Datetime } from 'vue-datetime'
import VueMarkdown from 'vue-markdown-konishi'
import { maxLength, minValue, required } from 'vuelidate/lib/validators'

import EVENT_CREATE_MUTATION from '~/gql/mutation/eventCreate'

const consola = require('consola')

export default {
  components: {
    Datetime,
    VueMarkdown,
  },
  data() {
    return {
      form: {
        description: undefined,
        end: undefined,
        'is-in-person': undefined,
        'is-remote': undefined,
        'invitee-count-maximum': undefined,
        location: undefined,
        name: undefined,
        'organizer-username': undefined,
        sent: false,
        slug: undefined,
        start: new Date().toISOString(), // workaround for https://github.com/mariomka/vue-datetime/issues/177
        visibility: undefined,
      },
      graphqlErrorMessage: undefined,
    }
  },
  computed: {
    signedInUsername() {
      return this.$store.state.jwtDecoded &&
        this.$store.state.jwtDecoded.role === 'maevsi_account' &&
        this.$store.state.jwtDecoded.exp > Math.floor(Date.now() / 1000)
        ? this.$store.state.jwtDecoded.username
        : undefined
    },
  },
  methods: {
    submit() {
      this.form.sent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      this.$apollo
        .mutate({
          mutation: EVENT_CREATE_MUTATION,
          variables: {
            createEventInput: {
              event: {
                description: this.form.description,
                end: this.form.end !== '' ? this.form.end : undefined,
                inviteeCountMaximum:
                  this.form['invitee-count-maximum'] !== ''
                    ? +this.form['invitee-count-maximum']
                    : undefined,
                isInPerson: this.form['is-in-person'],
                isRemote: this.form['is-remote'],
                location:
                  this.form.location !== '' ? this.form.location : undefined,
                name: this.form.name,
                organizerUsername: this.signedInUsername,
                slug: this.form.slug,
                start: this.form.start,
                visibility: this.form.visibility,
              },
            },
          },
        })
        .then((_value) => {
          alert(this.$t('eventCreateSuccess'))
          this.$router.push(
            this.localePath(`/event/${this.signedInUsername}/${this.form.slug}`)
          )
        })
        .catch((reason) => {
          this.graphqlErrorMessage = reason.toString()
          consola.error(reason)
        })
    },
    updateSlug() {
      this.form.slug = this.$slugify(this.form.name, {
        lower: true,
        strict: true,
      })
    },
  },
  validations() {
    return {
      form: {
        description: {
          maxLength: maxLength(this.$global.EVENT_DESCRIPTION_MAXIMUM),
        },
        end: {},
        'invitee-count-maximum': {
          minValue: minValue(1),
        },
        'is-in-person': {},
        'is-remote': {},
        name: {
          maxLength: maxLength(this.$global.EVENT_NAME_MAXIMUM),
          required,
        },
        location: {
          maxLength: maxLength(this.$global.EVENT_LOCATION_MAXIMUM),
        },
        slug: {
          maxLength: maxLength(this.$global.EVENT_SLUG_MAXIMUM),
          required,
          formatSlug: this.$global.VERIFICATION_FORMAT_SLUG,
        },
        start: {
          required,
        },
        visibility: {
          required,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  attendanceType: 'Anwesenheitstyp'
  description: 'Beschreibung'
  edit: 'Bearbeiten'
  end: 'Ende'
  eventCreate: 'Veranstaltung erstellen'
  eventCreateSuccess: 'Veranstaltung erfolgreich erstellt.'
  inputLocationInfo: 'Ein Suchbegriff für Google Maps.'
  isInPerson: 'vor Ort'
  isRemote: 'remote'
  maximumInviteeCount: 'Maximale Gästezahl'
  name: 'Name'
  namePlaceholder: 'Willkommensfeier'
  location: 'Ort'
  preview: 'Vorschau'
  previewNoContent: 'Kein Inhalt für die Vorschau 😕'
  slug: 'Slug'
  slugPlaceholder: 'willkommensfeier'
  start: 'Beginn'
  visibility: 'Sichtbarkeit'
  visibilityPrivate: 'privat'
  visibilityPublic: 'öffentlich'
en:
  attendanceType: 'Attendance type'
  description: 'Description'
  edit: 'Edit'
  end: 'End'
  eventCreate: 'Create event'
  eventCreateSuccess: 'Event created successfully.'
  inputLocationInfo: 'A search phrase for Google Maps.'
  isInPerson: 'in person'
  isRemote: 'remote'
  maximumInviteeCount: 'Maximum invitee count'
  name: 'Name'
  namePlaceholder: 'Welcome Party'
  location: 'Location'
  preview: 'Preview'
  previewNoContent: 'No content to preview 😕'
  slug: 'Slug'
  slugPlaceholder: 'welcome-party'
  start: 'Start'
  visibility: 'Visibility'
  visibilityPrivate: 'private'
  visibilityPublic: 'public'
</i18n>
