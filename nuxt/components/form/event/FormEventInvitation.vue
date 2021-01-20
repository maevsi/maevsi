<template>
  <Form
    :form="$v.form"
    :form-sent="form.sent"
    :graphql-error-message="graphqlErrorMessage"
    :is-embedded="isEmbedded"
    :submit-name="$t('save')"
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
    <FormInputUsername
      id="username"
      form-key="accountUsername"
      :v="$v"
      @input="$v.form.accountUsername.$model = $event"
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
        <FormInputError
          :form-input="$v.form.firstName"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
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
        <FormInputError
          :form-input="$v.form.lastName"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
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
        <FormInputError
          :form-input="$v.form.address"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
      </template>
    </FormInput>
  </Form>
</template>

<script>
import { email, maxLength } from 'vuelidate/lib/validators'

import CONTACT_CREATE_MUTATION from '~/gql/mutation/contact/contactCreate'
import CONTACT_UPDATE_BY_ID_MUTATION from '~/gql/mutation/contact/contactUpdateById'
import INVITATION_CREATE_MUTATION from '~/gql/mutation/invitation/invitationCreate'

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
        sent: false,
        id: undefined,
        accountUsername: undefined,
        address: undefined,
        emailAddress: undefined,
        firstName: undefined,
        lastName: undefined,
      },
      graphqlErrorMessage: undefined,
    }
  },
  created() {
    if (this.dataInitial) {
      ;[
        'id',
        'accountUsername',
        'address',
        'emailAddress',
        'firstName',
        'lastName',
      ].forEach(
        (property) =>
          (this.$v.form[property].$model = this.dataInitial.contactByContactId[
            property
          ])
      )
    }
  },
  methods: {
    getSubmitPromise() {
      return new Promise((resolve, reject) => {
        this.form.sent = true
        this.graphqlErrorMessage = undefined
        this.$v.form.$reset()

        if (this.form.id) {
          // Edit
          this.$apollo
            .mutate({
              mutation: CONTACT_UPDATE_BY_ID_MUTATION,
              variables: {
                id: this.form.id,
                contactPatch: {
                  accountUsername:
                    this.form.accountUsername === ''
                      ? null
                      : this.form.accountUsername,
                  address: this.form.address === '' ? null : this.form.address,
                  authorAccountUsername: this.$store.state.jwtDecoded.username,
                  emailAddress:
                    this.form.emailAddress === ''
                      ? null
                      : this.form.emailAddress,
                  firstName:
                    this.form.firstName === '' ? null : this.form.firstName,
                  lastName:
                    this.form.lastName === '' ? null : this.form.lastName,
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
        } else {
          // Add
          this.$apollo
            .mutate({
              mutation: CONTACT_CREATE_MUTATION,
              variables: {
                contactInput: {
                  accountUsername:
                    this.form.accountUsername === ''
                      ? null
                      : this.form.accountUsername,
                  address: this.form.address === '' ? null : this.form.address,
                  authorAccountUsername: this.$store.state.jwtDecoded.username,
                  emailAddress:
                    this.form.emailAddress === ''
                      ? null
                      : this.form.emailAddress,
                  firstName:
                    this.form.firstName === '' ? null : this.form.firstName,
                  lastName:
                    this.form.lastName === '' ? null : this.form.lastName,
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
        }
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
        id: {},
        accountUsername: {
          existence: this.$global.validateUsername(this.$apollo),
          formatSlug: this.$global.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(this.$global.VALIDATION_USERNAME_LENGTH_MAXIMUM),
        },
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
