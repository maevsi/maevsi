<template>
  <Form
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit.prevent="submit"
  >
    <FormInputUsername
      id="username"
      form-key="username"
      :v="$v"
      @input="$v.form.username.$model = $event"
    />
    <FormInput
      :error="$v.form.firstName.$error"
      label-for="input-first-name"
      :title="$t('firstName')"
    >
      <input
        id="input-first-name"
        v-model.trim="$v.form.firstName.$model"
        class="form-input"
        type="text"
        :placeholder="$t('globalPlaceholderFirstName')"
      />
      <template slot="inputError">
        <FormError
          :validation-object="$v.form.firstName"
          validation-property="maxLength"
        >
          {{ $t('globalValidationTooLong') }}
        </FormError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form.lastName.$error"
      label-for="input-last-name"
      :title="$t('lastName')"
    >
      <input
        id="input-last-name"
        v-model.trim="$v.form.lastName.$model"
        class="form-input"
        type="text"
        :placeholder="$t('globalPlaceholderLastName')"
      />
      <template slot="inputError">
        <FormError
          :validation-object="$v.form.lastName"
          validation-property="maxLength"
        >
          {{ $t('globalValidationTooLong') }}
        </FormError>
      </template>
    </FormInput>
    <FormInputEmailAddress
      id="email-address"
      :form-element="$v.form.emailAddress"
      @input="$v.form.emailAddress.$model = $event"
    />
    <FormInput
      :error="$v.form.address.$error"
      label-for="input-address"
      :title="$t('address')"
    >
      <textarea
        id="input-address"
        v-model.trim="$v.form.address.$model"
        class="form-input"
        :placeholder="$t('globalPlaceholderAddress')"
        rows="2"
      />
      <template slot="inputError">
        <FormError
          :validation-object="$v.form.address"
          validation-property="maxLength"
        >
          {{ $t('globalValidationTooLong') }}
        </FormError>
      </template>
    </FormInput>
    <div
      v-show="!isEmbedded"
      class="flex flex-col items-center justify-between"
    >
      <ButtonSubmit
        ref="buttonSubmit"
        :error="!!graphqlErrorMessage"
        :form="$v.form"
        :form-sent="form.sent"
      >
        {{ $t('save') }}
      </ButtonSubmit>
    </div>
    <CardAlert
      v-if="!isEmbedded"
      class="mt-4"
      :error-message="graphqlErrorMessage"
      :validation-object="$v.form"
    />
  </Form>
</template>

<script>
import { email, maxLength } from 'vuelidate/lib/validators'

import CONTACT_CREATE_MUTATION from '~/gql/mutation/contactCreate'
import INVITATION_CREATE_MUTATION from '~/gql/mutation/invitationCreate'

const consola = require('consola')

export default {
  props: {
    dataInitial: {
      default: undefined,
      type: Object,
    },
    event: {
      required: true,
      type: Object,
    },
    isEmbedded: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      form: {
        address: undefined,
        emailAddress: undefined,
        firstName: undefined,
        lastName: undefined,
        sent: false,
        username: undefined,
      },
      graphqlErrorMessage: undefined,
      mounted: false,
    }
  },
  mounted() {
    if (this.dataInitial) {
      ;['address', 'emailAddress', 'firstName', 'lastName', 'username'].forEach(
        (property) =>
          (this.$v.form[property].$model = this.dataInitial[property])
      )
    }

    this.mounted = true
  },
  methods: {
    getSubmitPromise() {
      return new Promise((resolve, reject) => {
        this.form.sent = true
        this.graphqlErrorMessage = undefined
        this.$v.form.$reset()
        this.$apollo
          .mutate({
            mutation: CONTACT_CREATE_MUTATION,
            variables: {
              contactInput: {
                address:
                  this.form.address === '' ? undefined : this.form.address,
                creatorAccountUsername: this.$store.state.jwtDecoded.username,
                emailAddress:
                  this.form.emailAddress === ''
                    ? undefined
                    : this.form.emailAddress,
                firstName:
                  this.form.firstName === '' ? undefined : this.form.firstName,
                lastName:
                  this.form.lastName === '' ? undefined : this.form.lastName,
              },
            },
          })
          .then(({ data }) => {
            this.$apollo
              .mutate({
                mutation: INVITATION_CREATE_MUTATION,
                variables: {
                  invitationInput: {
                    contactId: +data.createContact.contact.id,
                    eventId: +this.event.id,
                  },
                },
              })
              .then((value) => {
                alert(
                  this.$global.capitalizeFirstLetter(
                    this.$t('success', { item: this.itemName })
                  )
                )
                resolve(value)
              })
              .catch((reason) => {
                this.graphqlErrorMessage = reason.toString()
                reject(reason)
              })
          })
          .catch((reason) => {
            this.graphqlErrorMessage = reason.toString()
            reject(reason)
          })
      })
    },
    async submit() {
      return await this.getSubmitPromise()
        .then((value) => value)
        .catch((reason) => consola.error(reason))
    },
  },
  validations() {
    return {
      form: {
        address: {
          maxLength: maxLength(this.$global.VALIDATION_ADDRESS_LENGTH_MAXIMUM),
        },
        emailAddress: {
          email,
          maxLength: maxLength(
            this.$global.VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM
          ),
        },
        firstName: {
          maxLength: maxLength(
            this.$global.VALIDATION_FIRST_NAME_LENGTH_MAXIMUM
          ),
        },
        lastName: {
          maxLength: maxLength(
            this.$global.VALIDATION_LAST_NAME_LENGTH_MAXIMUM
          ),
        },
        username: {
          formatSlug: this.$global.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(this.$global.VALIDATION_USERNAME_LENGTH_MAXIMUM),
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  address: 'Adresse'
  firstName: 'Vorname'
  lastName: 'Nachname'
  save: 'Speichern'
  username: 'Nutzername'
en:
  address: 'Address'
  firstName: 'First name'
  lastName: 'Last name'
  save: 'Save'
  username: 'Username'
</i18n>
