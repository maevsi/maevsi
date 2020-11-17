<template>
  <Form
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit="eventNew"
  >
    <FormInput
      :error="$v.form['name'].$error"
      label-for="input-name"
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
      <template slot="formError">
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
      :title="$t('slug')"
    >
      <input
        id="input-slug"
        v-model.trim="$v.form['slug'].$model"
        class="form-input"
        type="text"
        :placeholder="$t('slugPlaceholder')"
      />
      <template slot="formError">
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
      <template slot="formError">
        <FormError
          :validation-object="$v.form['visibility']"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form['maximum-invitee-count'].$error"
      label-for="input-maximum-invitee-count"
      :title="$t('maximumInviteeCount')"
    >
      <input
        id="input-maximum-invitee-count"
        v-model.trim="$v.form['maximum-invitee-count'].$model"
        class="form-input"
        type="number"
      />
      <template slot="formError">
        <FormError
          :validation-object="$v.form['maximum-invitee-count']"
          validation-property="minValue"
        >
          {{ $t('globalValidationMinValue') }}
        </FormError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form['description'].$error"
      label-for="input-description"
      :title="$t('description')"
    >
      <textarea
        id="input-description"
        v-model.trim="$v.form['description'].$model"
        class="form-input"
      />
      <template slot="formError">
        <FormError
          :validation-object="$v.form['description']"
          validation-property="maxLength"
        >
          {{ $t('globalValidationTooLong') }}
        </FormError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form['place'].$error"
      label-for="input-place"
      :title="$t('place')"
    >
      <input
        id="input-place"
        v-model.trim="$v.form['place'].$model"
        class="form-input"
        type="text"
      />
      <template slot="formError">
        <FormError
          :validation-object="$v.form['place']"
          validation-property="maxLength"
        >
          {{ $t('globalValidationTooLong') }}
        </FormError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form['start'].$error"
      label-for="input-start"
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
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        :icon="false"
        type="submit"
      >
        {{ $t('eventCreate') }}
      </Button>
    </div>
    <AlertGraphql
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
      class="mt-4"
    />
  </Form>
</template>

<script>
import { Datetime } from 'vue-datetime'
import { maxLength, minValue, required } from 'vuelidate/lib/validators'

import EVENT_CREATE_MUTATION from '~/gql/mutation/eventCreate'

const consola = require('consola')

export default {
  components: {
    Datetime,
  },
  data() {
    return {
      form: {
        description: undefined,
        end: undefined,
        'maximum-invitee-count': undefined,
        name: undefined,
        'organizer-username': undefined,
        place: undefined,
        sent: undefined,
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
    eventNew(e) {
      e.preventDefault()

      this.form.sent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      this.$apollo
        .mutate({
          mutation: EVENT_CREATE_MUTATION,
          variables: {
            createEventInput: {
              event: {
                organizerUsername: this.signedInUsername,
                description: this.form.description,
                end: this.form.end !== '' ? this.form.end : undefined,
                inviteeCountMaximum:
                  this.form['maximum-invitee-count'] !== ''
                    ? +this.form['maximum-invitee-count']
                    : undefined,
                name: this.form.name,
                place: this.form.place !== '' ? this.form.place : undefined,
                slug: this.form.slug,
                start: this.form.start,
                visibility: this.form.visibility,
              },
            },
          },
        })
        .then((_data) => {
          alert(this.$t('eventCreateSuccess'))
          this.$router.push(
            this.localePath(`/event/${this.signedInUsername}/${this.form.slug}`)
          )
        })
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
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
        name: {
          maxLength: maxLength(this.$global.EVENT_NAME_MAXIMUM),
          required,
        },
        slug: {
          maxLength: maxLength(this.$global.EVENT_SLUG_MAXIMUM),
          required,
          formatSlug: this.$global.VERIFICATION_FORMAT_SLUG,
        },
        visibility: {
          required,
        },
        'maximum-invitee-count': {
          minValue: minValue(1),
        },
        description: {
          maxLength: maxLength(this.$global.EVENT_DESCRIPTION_MAXIMUM),
        },
        place: {
          maxLength: maxLength(this.$global.EVENT_PLACE_MAXIMUM),
        },
        start: {
          required,
        },
        end: {},
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  description: 'Beschreibung'
  end: 'Ende'
  eventCreate: 'Veranstaltung erstellen'
  eventCreateSuccess: 'Veranstaltung erfolgreich erstellt.'
  maximumInviteeCount: 'Maximale Gästezahl'
  name: 'Name'
  namePlaceholder: 'Willkommensfeier'
  place: 'Ort'
  slug: 'Slug'
  slugPlaceholder: 'willkommensfeier'
  start: 'Start'
  visibility: 'Sichtbarkeit'
  visibilityPrivate: 'privat'
  visibilityPublic: 'öffentlich'
en:
  description: 'Description'
  end: 'End'
  eventCreate: 'Create event'
  eventCreateSuccess: 'Event created successfully.'
  maximumInviteeCount: 'Maximum invitee count'
  name: 'Name'
  namePlaceholder: 'Welcome Party'
  place: 'Place'
  slug: 'Slug'
  slugPlaceholder: 'welcome-party'
  start: 'Start'
  visibility: 'Visibiltiy'
  visibilityPrivate: 'private'
  visibilityPublic: 'public'
</i18n>
